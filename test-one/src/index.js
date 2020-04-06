import { log } from "./helpers/logger";

export const go = async () => {
  // Your code should go here instead of the welcome message below. Create and modify additional files as necessary/appropriate.
  
   
    for(var i=1;i<=100;i++){
      var output = "";    //generate a empty var
      if(i%3==0){
        output += "Boss"; //add Boss to output if true
      }
      if(i%5==0){
        output += "Hog";  //add Hog to output if true
      }
      if(output == ""){   //adds i to output if output still empty
        output = i;
      }
      await log(output); //output the value of output to the console using the predesigned function
    }
};

go();
