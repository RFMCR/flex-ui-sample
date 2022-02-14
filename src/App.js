import React from "react";
import * as Flex from "@twilio/flex-ui";
import Axios from 'axios'

class App extends React.Component {
  render() {
    const { manager } = this.props;

    if (!manager) {
      return null;
    }

    /*******************************    HOW TO...   ************************************/
    
    // \node_modules\@twilio\flex-ui\src\localization\Strings.d.ts   Here are all the different fields to be changed. 
    // They are accessed using  manager.strings.??? whatever field is in the strings file.
    manager.strings.SideNavTeamsView = "Equipos de Trabajo"

    //Task icon color not bubble
    // Flex.DefaultTaskChannels.Chat.colors.main = "#00ff00"
    // Flex.DefaultTaskChannels.ChatWhatsApp.colors.main = "#ff0000";
    // Flex.DefaultTaskChannels.ChatSms.colors.main = "#0000ff";
    // Flex.DefaultTaskChannels.ChatMessenger.colors.main = "#ff00ff";

    Flex.MainHeader.defaultProps.logoUrl = 'https://tangerine-toad-5117.twil.io/assets/feathercorp-logo-white.svg';

    //Adding event listeners to Flex Actions
    Flex.Actions.addListener("beforeAcceptTask",(payload, abortFunction)=>{
      alert("Triggered before event Accept Task");
      if (!window.confirm("Are you sure you want to accept the task?")){
        abortFunction()
      }
      manager.strings.SideNavTeamsView = "Equipos de Trabajo Modificado beforeAcceptTask"
    });

    Flex.Actions.addListener("afterAcceptTask",(payload,abortFunction)=>{
      alert("Triggered after event Accept Task");
      obj = Flex.ContextProvider
      console.log(Flex.ContextProvider)
    })

    //Creating a personalized action
    Flex.Actions.registerAction("ShowNiceQuote",(payload)=>{
      return Axios.get("https://quotes.rest/qod.json?category=inspire")
      .then(response =>{        
        alert(`Here's an inspirational quote to keep you going: ${response.data.contents.quotes[0].quote}`);
      })
      .catch(error => {
        console.log(error);
        throw error;
      })
    })

    Flex.Actions.addListener("afterCompleteTask",(payload)=> {
      return Flex.Actions.invokeAction("ShowNiceQuote");
    })


    return (
      <Flex.ContextProvider manager={manager}>
        <Flex.RootContainer />
      </Flex.ContextProvider>
    );
  }
}

export default App;
