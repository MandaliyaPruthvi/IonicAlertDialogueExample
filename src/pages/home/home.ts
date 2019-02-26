import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  promptAlertData: any;
  promptAlertMultiData: any;
  confirmData: any;
  RadioOpen: any;
  RadioResult:any;
  show: boolean = false;
  out: any;
  constructor(  
    public navCtrl: NavController,
    public alertCtrl: AlertController) {
  }
  // *TC: buttons: ['OK']
  basicAlert(){
    const basicalert = this.alertCtrl.create({
      enableBackdropDismiss: false ,
      title: 'Basic Alert',
      subTitle: 'This is basic alert dialouge...',
      buttons:['OK']
    });
    basicalert.present();
  }
  // *Note: Here we can take input from user and pass it back to the base page.
  // *TC: It has handlers i.e. opitonal.   title,message,inputs,buttons
  promptAlert(){
    const prompt = this.alertCtrl.create({
      enableBackdropDismiss: false ,
      title: 'Get Name',
      message: 'Enter Your Name Below...',
      inputs: [
        {
          name: 'name',
          placeholder: 'Enter your name'
        },
        {
          name: 'age',
          type: 'number',
          placeholder: 'Enter your age'
        }
      ],
      buttons:[
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel Clicked',data);
          }
        },
        {
          text: 'Save',
          handler: data => {
            // Transferring Prompt Alert data to base page 
            this.promptAlertMultiData = { name: data.name, age: data.age};
            this.promptAlertData = data.name;
            this.show = true;
            this.out = "Name: " + data.name + " & Age: " + data.age;
            console.log('Save Clicked. JSON Data: ',data);
            console.log('Save Clicked. Normal Data: ',this.promptAlertData);            
            console.log('Save Clicked. Multiple Data: ',JSON.stringify(this.promptAlertMultiData));            
          }
        }
      ]
    });
    prompt.present();
  }
  // *Note: Here handler is used but no data is being passed, however we can use counter variables
  // *TC: title,message,buttons.
  confirmAlert(){
    const confirm = this.alertCtrl.create({
      enableBackdropDismiss: false ,
      title: 'Confirm name',
      message: 'Are you: '+this.promptAlertData+' ?',
      buttons:[
        {
          text: 'agree',
          handler: () => {
            this.confirmData = "Yes";
            alert(this.confirmData);
            console.log("Agree");
            this.show = true;
          }
        },{
          text: 'disagree',
          handler: () => {
            this.confirmData = "No";
            alert(this.confirmData);
            console.log("Disagree");
            this.show = false;
          }
        }
      ]
    });
    confirm.present();
  }
  // *Note: Here only radio buttons can be added no other buttons can be added.
  // create, setTitle, addInput, addButton.
  radioAlert(){
    let radioalert = this.alertCtrl.create({enableBackdropDismiss: false});
    
    radioalert.setTitle('Show Output');

    radioalert.addInput({
      type: 'radio',
      label: 'Yes',
      value: 'Yes',
      checked: true
    });
    radioalert.addInput({
      type: 'radio',
      label: 'No',
      value: 'No',
      checked: false
    });

    radioalert.addButton('Cancel');
    radioalert.addButton({
      text: 'OK',
      handler: data => {
        // this.RadioOpen = false;
        this.RadioResult = data;
        if(this.RadioResult == "Yes"){
          this.show = true;
        }else{
          this.show = false;
        }
        console.log(this.RadioResult);
      }
    });
    radioalert.present();
  }
}
