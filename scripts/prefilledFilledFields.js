/**
 * This function prefills the following fields in the SDS web form, depending on whether the client request is NonProd or Prod:
 * Service Account Name
 * Please add the above service account to the following groups (in the .NET domain)
 * Service Account name & password to be sent directly to:
 */
function prefillSdsFields(){

    //check that a valid categoryName is returned from the client data
    const envElement = document.getElementById("gcdCltRequestType");
  
    const categoryName = envElement.innerText;
    console.log(categoryName);
  
    if (!envElement) {
      showMessage("Unable to find the EWS request type. ", "warning");
      return;
    }
  
    //-------------This section is Group Service Name------------------------------------/
    //returns the web services the client selected as an array "gcdCltEwsServices" from api-gccode.getIssueData
    const serviceNamesElement = document.getElementById("gcdCltEwsServices");
    //separates the string into an array
    const serviceNames = serviceNamesElement.innerText.split(",");

    //returns the WSED Access Type the client selected from api-gccode.getIssueData
    const wsedAccessTypeElement = document.getElementById("gcdCltWsedAccessType");
    console.log("wsedAccessTypeElement: ", wsedAccessTypeElement);
    const wsedAccessType = wsedAccessTypeElement.innerText;
    console.log("wsedAccessType: ", wsedAccessType);
  
  
    //transform each element from a service name into a AD group name
    const groupNameLookupTable = {
      "wsaddress-prod":"NA-SF-WSADDRESS",
      "wsaddress-non-prod":"SADE-SF-WSADDRESS-UAT",
      "wsaudit-prod": "NA-SF-WSAUDIT",
      "wsaudit-non-prod": "SADE-SF-WSAUDIT-UAT",
      "wsed-prod-grpex": "NA-SF-WSED-GRPEX",
      "wsed-prod-read": "NA-SF-WSED-READ",
      "wsed-non-prod-grpex": "SADE-SF-WSED-GRPEX-UAT",
      "wsed-non-prod-read": "SADE-SF-WSED-READ-UAT",
      "wsemail-prod": "NA-SF-WSEMAIL",
      "wsemail-non-prod": "SADE-SF-WSEMAIL",
      "wsdblink-prod": "NA-SF-WSDBLINK",
      "wsdblink-non-prod": "SADE-SF-WSDBLINK-UAT"
    };
  
    console.log("serviceNames ", serviceNames);
  
    const groupNames = serviceNames.map((serviceName) => {
      let environment;
  
      if (categoryName.includes("NonProd")){
        environment = `non-prod`;
        console.log("non-prod", environment);
      }
      else {
        environment = `prod`;
        console.log("prod", environment);
      }
      
      let key = `${serviceName.toLowerCase().trim()}-${environment}`;
      if (serviceName === "wsed"){
        key = key + `-${wsedAccessType}`;
      }
      console.log("key ", key);
      return groupNameLookupTable[key] || "???"
    });
  
    console.log(groupNames);
    //TODO: Add an if statement to add a special case for WSED and group member access
  
    //Prefill the field with the value(s), by taking the array and transform to a string
    const groupNamesString = groupNames.join(", ");
    //Put the groupName value(s) associated with the selected serviceNames into the frmSdsAcctGroupAdd field
    const frmSdsAcctGroupAddElement = document.getElementById("frmSdsAcctGroupAdd");
    frmSdsAcctGroupAddElement.innerText = groupNamesString;
  
    //-------------This section is Service Account Name------------------------------------/
    //if statement to prefill with gcdSdsServiceAcctName if SDS Info already exists, 
    //else add from the client contact info (prefill with gcdCltExistingAcctName)
    //returns id="ExistingAcctName" from the html tables created from api-gccode.getIssueData
    let serviceAcctName;
  
    //This is the green part: sds from gcode
    const gcdSdsServiceAcctNameElement = document.getElementById("gcdSdsServiceAcctName");
    if (gcdSdsServiceAcctNameElement) {
      //Get the value from the Gcode SDS Info gcdSdsServiceAcctName
      serviceAcctName = gcdSdsServiceAcctNameElement.innerText.trim();
    }
    else {
      //get the value from Gcode client info frmCltExistingAcctName
      const gcdCltExistingAcctNameElement = document.getElementById("gcdCltExistingAcctName");
      //left side checks that is not Null, right side checks that not empty
      if (gcdCltExistingAcctNameElement && gcdCltExistingAcctNameElement.innerText.trim()){
        serviceAcctName = gcdCltExistingAcctNameElement.innerText.trim();
      }
      else {
        //returns id="gcdCltCsdAcronym" from the html tables created from api-gccode.getIssueData
        //This will insert the client csd acronym as part of the service acct name
        const gcdCltCsdAcronymElement = document.getElementById("gcdCltCsdAcronym");
        const gcdCltCsdAcronym = gcdCltCsdAcronymElement.innerText.toUpperCase().trim();
        
        //check if the frmCltRequestType contains "NonProd". If yes, then add "-dev" at the end of the frmSdsServiceAcctName
        if(categoryName.includes("NonProd")){
          serviceAcctName = `SV-SF-${gcdCltCsdAcronym}-DEV`;
        }
        else {
          serviceAcctName = `SV-SF-${gcdCltCsdAcronym}`;
        }
      }
    }
  
    //Put the value into the form field
    const frmSdsServiceAcctNameElement = document.getElementById("frmSdsServiceAcctName");
    console.log(serviceAcctName);
  
    frmSdsServiceAcctNameElement.setAttribute('value', serviceAcctName);
  
    //-------------This section is Remove Service Acct Group(s)------------------------------------/
    //returns id="frmSdsAcctGroupRemove" from the html tables created from api-gccode.addSdsData
    //initialize removeServiceAcctGroup with an empty string so it doesn't cause an 'undefined' error if
    //the SDS Info doesn't exist
    let removeServiceAcctGroup = "";
  
    //get the list value(s) from gcdSdsAcctGroupRemove
    const gcdSdsAcctGroupRemoveElement = document.getElementById("gcdSdsAcctGroupRemove");
    console.log("gcdSdsAcctGroupRemoveElement: ", gcdSdsAcctGroupRemoveElement);
    
    if(gcdSdsAcctGroupRemoveElement) {
      //Get the value from the SDS Info, if it already exists
      removeServiceAcctGroup = gcdSdsAcctGroupRemoveElement.innerText.trim();
      console.log("removeServiceAcctGroup: ", removeServiceAcctGroup);
    }
  
    //Put the value into the form field
    const frmSdsAcctGroupRemoveElement = document.getElementById("frmSdsAcctGroupRemove");
    frmSdsAcctGroupRemoveElement.innerText = removeServiceAcctGroup;
  
    console.log("removeServiceAcctGroup: ", removeServiceAcctGroup);
  
    //-------------This section is WSED------------------------------------/
    //returns id="frmSdsWsedAttributes" from sds-index.html
    //initialize removeServiceAcctGroup with an empty string so it doesn't cause an 'undefined' error if
    //the SDS Info doesn't exist
    let wsedAttributes = "";
  
    //get the list value(s) from gcdSdsWsedAttributes
    const gcdSdsWsedAttributesElement = document.getElementById("gcdSdsWsedAttributes");
  
    if (gcdSdsWsedAttributesElement){
      //Get the value from the SDS Info, if it already exists
      wsedAttributes = gcdSdsWsedAttributesElement.innerText.trim();
      console.log("wsedAttributes: ", wsedAttributes);
    }
  
     //Put the value into the form field
     const frmSdsWsedAttributesElement = document.getElementById("frmSdsWsedAttributes");
     frmSdsWsedAttributesElement.innerText = wsedAttributes;
     console.log("wsedAttributes: ", wsedAttributes);
  
    //-------------This section is Manager Email Address------------------------------------/
    //returns id="mgrEmail" from the html tables created from api-gccode.getIssueData
    let mgrEmailAddress;
  
    const gcdSdsPasswordEmailElement = document.getElementById("gcdSdsPasswordEmail");
    if (gcdSdsPasswordEmailElement) {
      //Get the value from the SDS Info 
      mgrEmailAddress = gcdSdsPasswordEmailElement.innerText.trim();
    }
    else {
      //get the value from client contact Info manager email
      const gcdCltMgrEmailElement = document.getElementById("gcdCltMgrEmail");
      mgrEmailAddress = gcdCltMgrEmailElement.innerText.trim();
    }
    
    //Put the value into the form field
    const frmSdsPasswordEmailElement = document.getElementById("frmSdsPasswordEmail");
    console.log(mgrEmailAddress);
  
    frmSdsPasswordEmailElement.setAttribute('value', mgrEmailAddress);
  
    //-------------This section is SDS Member contact------------------------------------/
    //returns id="sdsMemberEmail" from the html tables created from api-gccode.getIssueData
    //initialize variable with an empty string so it doesn't cause an 'undefined' error if
    //the value doesn't exist
    let sdsMemberEmail = "";
  
    const gcdSdsMemberEmailElement = document.getElementById("gcdSdsMemberEmail");
    
    if (gcdSdsMemberEmailElement){
      //Get the value from the SDS Info, if it already exists
      sdsMemberEmail = gcdSdsMemberEmailElement.innerText.trim();
      console.log("sdsMemberEmail: ", sdsMemberEmail);       
    }
  
    //Put the value into the form field
    const frmSdsMemberEmailElement = document.getElementById("frmSdsMemberEmail");
    frmSdsMemberEmailElement.selectedIndex = sdsMemberEmail;
   
  }