import mongoose from 'mongoose';

export async function connect() {
  try {
    await mongoose.connect('mongodb://localhost/api_test', {
      useNewUrlParser: true,
      useFindAndModify: false
    });
    console.log('>>> DB is connected');
  } catch (error) {
    console.log('Something goes wrong!');
    console.log(error);
  }
}
