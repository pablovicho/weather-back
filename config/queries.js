// Insert one document 
export async function insertDocument(client, data) {
    const result = await client.db("mydb").collection("mycollection").insertOne(data);
    console.log(`Inserted document with _id: ${result.insertedId}`);
  }
  
  // Find one document by date
  export async function findDocumentByDate(client, date) {
    const result = await client.db("mydb").collection("mycollection")
      .findOne({ date: date });
    return result || null;
  }
  