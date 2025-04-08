export class tag {
  id: string;
  name: string;

constructor(data: {id sting; name: string;}) {
  this.id = data.id;
  this.name = data.name;
}

static from Firestore(doc: any): Tag {
  return new Tag({
    id:doc.id,
    name: doc.data().name,
  });
}

toFirestore() {
  return{
    name: this.name,
  };
}
}
