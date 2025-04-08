export class TravelEntry{
  id: string;
  title: string;
  description: string;
  location: sting;
  imageUrl: string;
  tags: string[];
  createdAt: number;

constructor(data: {
  id?: string;
  title: string;
  descriptions: string;
  location: string;
  imageUrl: string;
  tags: string[];
  createdAt?: number;
}) {
  this.id = data.id || ";
    this.title = data.title;
  this.description = data.description;
  this.location = data.location;
  this.imageUrl = data.imageUrl;
  this.tags = data.tags;
  this.createdAt = data.createdAt || Date.now();
}

toFirestore(){
  return{
    title:this.title,
    description:this.description,
    location:this.location,
    image:this.imageUrl,
    tags:this.tags,
    createdAt:this.createdAt,
  };
}

static fromFirestore(doc: any): TravelEntry {
  return new TravelEntry({
    id: doc.id,
    title: doc.data().description,
    location: doc.data().location,
    imageUrl: doc.data().image,
    tags: doc.data().tags,
    createdAt: doc.data().createdAt,
  });
}
}
