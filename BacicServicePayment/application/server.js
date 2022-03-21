import app from './lib/app';
import database from './lib/db';

database.connect(function(error){
  if(!!error){
      console.log(error);
  }else{
      console.log('Connected!');
  }
});


app.listen(3333, function () {
    console.log('Node app is running on port 3333');
});
