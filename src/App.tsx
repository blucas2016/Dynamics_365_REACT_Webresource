import React from 'react';
import './App.css';


//those components are required because I use it in dialog form
import { Stack, PrimaryButton, TextField, DatePicker, initializeIcons } from 'office-ui-fabric-react';

//initialization of icons - without calling this function icons for DatePicker would not be shown
initializeIcons();
declare const window: any;

//this interface contains description of state and properties for Dialog application
export interface IAKLDynamics365State {
  //text input
  text: string | undefined;
  //date input
  StartDate: Date | undefined;

  EndDate: Date | undefined;
}

class AKLDynamics365 extends React.Component<IAKLDynamics365State, IAKLDynamics365State> {
  constructor(props: IAKLDynamics365State) {
    super(props);

    //passing of data from properties to state of control during initialization
    this.state = props;
  }

  //this function is used to control formatting of datetime field
  private formatDate = (value?: Date | undefined): string => {
    if (!value) {
      return "";
    }

    let result = ("0" + (value.getMonth() + 1).toString()).slice(-2) + "/";
    result += ("0" + value.getDate().toString()).slice(-2) + "/";
    result += value.getFullYear().toString();

    return result;
  }

  //heart of application that returns React markup
  render() {
    return (
      <>
        <TextField
          label="Candidate name"
          value={this.state.text}
          onChange={(event: any, newvalue: string | undefined) => { this.setState({ text: newvalue }); }} />
        <DatePicker
          label="Interview Begin:"
          value={this.state.StartDate}
          onSelectDate={(newValue: Date | undefined | null) => { this.setState({ StartDate: newValue ? newValue : undefined }); }}
          formatDate={this.formatDate}
        />
        <DatePicker
          label="Interview End:"
          value={this.state.EndDate}
          onSelectDate={(newValue: Date | undefined | null) => { this.setState({ EndDate: newValue ? newValue : undefined }); }}
          formatDate={this.formatDate}
        />
        <div className="footerDiv">
          <Stack horizontal horizontalAlign={"end"} tokens={{ childrenGap: 10, padding: 10 }}>
            <PrimaryButton text="OK" onClick={() => {
              //This code on click of "OK" button returns current state to calling part
              window.returnValue = this.state;
             
             
              window.close();
            }} />
            <PrimaryButton text="Cancel" onClick={() => {
              //This code closes the dialog window - ATM this is the only possible way
              window.close();
            }}/>
          </Stack>
        </div>
      </>);
  }
}

export default AKLDynamics365;