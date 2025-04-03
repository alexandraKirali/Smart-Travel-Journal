import { StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeScreenView } from '@/components/SafeScreenView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TabParamList } from '../lib/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { storage, db } from '../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs } from 'firebase/firestore';

type Props = NativeStackScreenProps<TabParamList, 'Upload'>;

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  tags: z.array(z.string()).max(3, 'You can select up to 3 tags'),
  location: z.string().min(1, 'Location is required'),
  image: z.string().min(1, 'Image is required'),
});

type FormData = z.infer<typeof formSchema>;

interface Tag {
  id: string;
  name: string;
}

export default function UploadScreen({ navigation }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [autoLocation, setAutoLocation] = useState<string | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { control, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      tags: [],
      location: '',
      image: '',
    },
  });

  useEffect(() => {
    loadTags();
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const [address] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (address) {
        const locationString = `${address.city || ''}, ${address.country || ''}`;
        setAutoLocation(locationString);
        setValue('location', locationString);
      }
    })();
  }, []);

  const loadTags = async () => {
    try {
      const tagsSnapshot = await getDocs(collection(db, 'tags'));
      const loadedTags = tagsSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name as string
      }));
      setTags(loadedTags);
    } catch (error) {
      console.error('Error loading tags:', error);
    }
  };

  const handleTagSelect = (tagName: string) => {
    const newSelectedTags = selectedTags.includes(tagName)
      ? selectedTags.filter(tag => tag !== tagName)
      : selectedTags.length >= 3
        ? (Alert.alert('Maximum Tags', 'You can only select up to 3 tags.'), selectedTags)
        : [...selectedTags, tagName];
    
    setSelectedTags(newSelectedTags);
    setValue('tags', newSelectedTags, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setValue('image', result.assets[0].uri, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!imageUri) {
      setValue('image', '', {
        shouldValidate: true,
        shouldDirty: true,
      });
      return;
    }

    try {
      setIsLoading(true);

      // Upload image to Firebase Storage
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const imageRef = ref(storage, `travel-journals/${Date.now()}`);
      await uploadBytes(imageRef, blob);
      const imageUrl = await getDownloadURL(imageRef);

      // Save entry to Firestore
      await addDoc(collection(db, 'travel-journals'), {
        ...data,
        image: imageUrl,
        createdAt: Date.now(),
      });

      // Show success alert
      Alert.alert(
        'Success!',
        'Your travel entry has been uploaded.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form and states
              reset();
              setImageUri(null);
              setSelectedTags([]);
              // Reset location to auto-detected value
              if (autoLocation) {
                setValue('location', autoLocation);
              }
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error uploading entry:', error);
      Alert.alert(
        'Error',
        'Failed to save your travel entry. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeScreenView>
      <ScrollView style={styles.container}>
        <ThemedView style={styles.form}>
          <ThemedText type="title">Create Travel Entry</ThemedText>

          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <ThemedView style={styles.inputContainer}>
                <ThemedText>Title</ThemedText>
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter title"
                  placeholderTextColor="#666"
                />
                {errors.title && (
                  <ThemedText style={styles.errorText}>{errors.title.message}</ThemedText>
                )}
              </ThemedView>
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <ThemedView style={styles.inputContainer}>
                <ThemedText>Description</ThemedText>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Describe your travel experience"
                  placeholderTextColor="#666"
                  multiline
                  numberOfLines={4}
                />
                {errors.description && (
                  <ThemedText style={styles.errorText}>{errors.description.message}</ThemedText>
                )}
              </ThemedView>
            )}
          />

          <Controller
            control={control}
            name="tags"
            render={({ field: { value } }) => (
              <ThemedView style={styles.inputContainer}>
                <ThemedText>Add tags to your entry (max 3)</ThemedText>
                <ThemedView style={styles.tagsContainer}>
                  {tags.map((tag) => (
                    <TouchableOpacity
                      key={tag.id}
                      style={[
                        styles.tagButton,
                        selectedTags.includes(tag.name) && styles.selectedTag
                      ]}
                      onPress={() => handleTagSelect(tag.name)}
                    >
                      <ThemedText style={[
                        styles.tagText,
                        selectedTags.includes(tag.name) && styles.selectedTagText
                      ]}>
                        {tag.name}
                      </ThemedText>
                    </TouchableOpacity>
                  ))}
                </ThemedView>
                {errors.tags && (
                  <ThemedText style={styles.errorText}>{errors.tags.message}</ThemedText>
                )}
              </ThemedView>
            )}
          />

          <Controller
            control={control}
            name="location"
            render={({ field: { onChange, value } }) => (
              <ThemedView style={styles.inputContainer}>
                <ThemedText>Location</ThemedText>
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter location"
                  placeholderTextColor="#666"
                />
                {errors.location && (
                  <ThemedText style={styles.errorText}>{errors.location.message}</ThemedText>
                )}
              </ThemedView>
            )}
          />

          <ThemedView style={styles.imageContainer}>
            <ThemedText>Click below to upload an image</ThemedText>
            {imageUri ? (
              <TouchableOpacity onPress={pickImage}>
                <Image source={{ uri: imageUri }} style={styles.image} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                <Image 
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2496/2496846.png' }} 
                  style={styles.uploadIcon}
                />
              </TouchableOpacity>
            )}
            {errors.image && (
              <ThemedText style={styles.errorText}>{errors.image.message}</ThemedText>
            )}
          </ThemedView>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading || !imageUri}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <ThemedText style={styles.submitButtonText}>Create Entry</ThemedText>
            )}
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    </SafeScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    paddingTop: 35,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    gap: 16,
  },
  inputContainer: {
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    backgroundColor: '#f7f7f7',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  picker: {
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
  },
  imageContainer: {
    gap: 8,
  },
  imageButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
    height: 70,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: '#00929a',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f7f7f7',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedTag: {
    backgroundColor: '#00929a',
    borderColor: '#00929a',
  },
  tagText: {
    fontSize: 13,
    color: '#333',
  },
  selectedTagText: {
    color: '#fff',
  },
  uploadIcon: {
    width: 50,
    height: 50,
  },
}); 