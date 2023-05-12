const groupNameLookupTable = {
	wsaddress: {
  	nonProd: "SADE-SF-WSADDRESS-UAT",
    prod: "NA-SF-WSADDRESS"
  },
  wsed: {
  	nonProd: {
    	grpex: "-SF-WSSADEED-GRPEX-UAT",
      read: "SADE-SF-WSED-READ-UAT"
    },
    prod: {
    	grpex: "NA-SF-WSED-GRPEX",
      read: "NA-SF-WSED-READ"
    }
  },
  wsemail: {
  	nonProd: "SADE-SF-WSEMAIL",
    prod: "NA-SF-WSEMAIL"
  },
  wsdblink: {
  	nonProd: "SADE-SF-WSDBLINK-UAT",
    prod: "NA-SF-WSDBLINK"
  },
  wsaudit: {
  	nonProd: "SADE-SF-WSAUDIT-UAT",
    prod: "NA-SF-WSAUDIT"
  }
 };
 
 function prefilledFields(groupLookup, ewsNames, ewsEnvironment, wsedPermission){
 
 	const categoryName = ewsEnvironment
	console.log("categoryName: ", categoryName);

	const serviceNames = ewsNames;
	console.log("serviceNames: ", serviceNames);
  
  //const checkWsedExists = ewsNames.includes('wsed');
  //console.log("checkWsedExists: ", checkWsedExists);
  
  const wsedAccessType = wsedPermission;
  console.log("wsedAccessType: ", wsedAccessType);
	
  const map = new Map(Object.entries(groupLookup));
  //console.log("map: ", map);
    
  //const getEnvNonProd = getServiceNames.nonProd;
  //console.log("getEnvNonProd: ", getEnvNonProd);
  
  //const getEnvProd = getServiceNames.prod;
  //console.log("getEnvProd: ", getEnvProd);
  
  //const getNonProdGrpexAccessType = getEnvNonProd.grpex;
  //console.log("getNonProdGrpexAccessType: ", getNonProdGrpexAccessType);
  
  //const getNonProdReadAccessType = getEnvNonProd.read;
  //console.log("getNonProdReadAccessType: ", getNonProdReadAccessType);
  
  //const getProdGrpexAccessType = getEnvProd.grpex;
  //console.log("getProdGrpexAccessType: ", getProdGrpexAccessType);
  
  //const getProdReadAccessType = getEnvProd.read;
  //console.log("getProdReadAccessType: ", getProdReadAccessType);
  
 	const groupNames = serviceNames.map(serviceName => {
  	let environment;
    let wsedAccess;
    
    //display each serviceName inside the array
    console.log("forEach serviceName: ", serviceName);
    
    //drill down into groupLookup to map each serviceName of the array  
    const getServiceName = map.get(serviceName);
  	console.log("getServiceName: ", getServiceName);
    
    //check each serviceName to see if it's NOT "wsed" first
  	if(serviceName !== "wsed") { 
       
    	//check if the serviceName is nonProd or prod
    	if(categoryName.includes("NonProd")){ 
      	environment = getServiceName.nonProd;
      	//console.log("nonProd environment: ", environment);
    	}
    	else {
      	environment = getServiceName.prod;
      	//console.log("prod environment: ", environment);
    	}
    
    // don't know how to return the key value if it's wsed??
    const nonWsedkey = environment;
    console.log("nonWsedkey: ", nonWsedkey);
    return groupLookup[nonWsedkey] || "???";
    }
    else {
    	if(categoryName.includes("NonProd")){
      	environment = getServiceName.nonProd;
        
      	if(wsedAccessType.includes("grpex")){
        	wsedAccess = environment.grpex;
          //console.log("nonProd grpex wsedAccess: ", wsedAccess);
        }
        else {
        	wsedAccess = environment.read;
          //console.log("nonProd read wsedAccess: ", wsedAccess);
        }
      }
      else {
      	environment = getServiceName.prod;
       	if(wsedAccessType.includes("grpex")){
        	wsedAccess = environment.grpex;
          //console.log("nonProd grpex wsedAccess: ", wsedAccess);
        }
        else {
        	wsedAccess = environment.read;
          //console.log("nonProd read wsedAccess: ", wsedAccess);
        }
       }
       
      const wsedkey = wsedAccess;
    	console.log("wsedkey: ", wsedkey);
    	return groupLookup[wsedkey] || "???";
      }

 });
 
 }
  
 prefilledFields(groupNameLookupTable, ['wsed', 'wsemail', 'wsaddress'], 'newNonProd', 'grpex');