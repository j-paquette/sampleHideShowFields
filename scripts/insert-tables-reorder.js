/**
 * This function gets issue in GCcode by issueID
 * @param {*} issueId 
 * @returns issueData
 */
async function fetchIssue(issueId){        
    //initialize the new request object
    //TODO: replace hard-coded project id 
    const requestUrl = `https://gccode.ssc-spc.gc.ca/api/v4/projects/11015/issues/${issueId}`;

    const request = new Request(requestUrl, {
        method: 'GET',
        cache: 'default',
        headers: {
            'Content-Type': 'application/json',
            //Uses Project Access token which grants access as role of "Maintainer" 
            //with scope=api (Grants complete read/write access to the API, including all groups and projects, the container registry, and the package registry.) a new issue thru the GitLab API
            //Private token below points to sdsCreate1 personal access token in GCcode (expires 2023june30):
            'PRIVATE-TOKEN': 'glpat-Dpk5gv43PqyTFFe1SVaR'
            },  
    });
        //to get the json data
        const response = await fetch(request);
    
        const issueData = await response.json();

        const newTitleIssueata = changeRequestTitle(issueData);

        //return issueData;
        return newTitleIssueata;
    }


/**
This function gets the form data entered by SDS (as a parameter) and re-orders the data tables, 
showing the Sds data table first. Ssc will need to see the Sds data, and can scroll down to see the client details, 
if needed.
@param issueId The gccode issue iid
*/
function reorderSscData(issueData) {
    const sectionStartTag = "<!--sds-section-start-->";
    const sectionEndTag = "<!--sds-section-end-->";
    //TODO: create a new issue to use for this test. Everytime I need to change the HTML, I should close old issues and create new ones.
    
    //Where the Sds table string begins
    const startIndex = issueData.description.indexOf(sectionStartTag);
    console.log("startIndex: ", startIndex);
    //Returns the starting point of the end of the string. sectionEndTag.length will return the end of the string
    const endIndex = issueData.description.indexOf(sectionEndTag) + sectionEndTag.length;
    console.log("endIndex: ", endIndex);

    //this selects only the Sds data table
    const sdsTable = issueData.description.substring(startIndex) + issueData.description.substring(endIndex);
    console.log("sdsTable: ", sdsTable);

    //this selects only the client data tables (no Sds table)
    issueData.description = issueData.description.substring(0, startIndex) + issueData.description.substring(endIndex);
    
    //this will concatinate all client data tables, putting the sds table at the beginning
    const newDescription = sdsTable.concat(issueData.description);

    //This will return the Sds table, client tables in the new order
    issueData.description = newDescription;
    console.log("final issue.description: ", issueData.description);
        
    }  


// /**
//  * This function gets the current Url and extracts the issueId.
//  * @returns issueIdParam
//  */ 
// function getCurrentIssueId(){
//     const urlParams = new URLSearchParams(window.location.search);
//     const issueIdParam = urlParams.get("issueId");
  
//     return issueIdParam;
// }


/**
 * This function creates and displays the GCcode issues
 * @param {*} issue 
 */
function populateSscSection(issue){
    const section = document.getElementById('ssc-issue-description');
    section.innerHTML = '';
  
    //const myArticle = document.createElement('article');
    const myH2 = document.createElement('h2');
    myH2.textContent = `Title: ${issue.title}`;
    section.appendChild(myH2);
  
    const myPara1 = document.createElement('p');
    myPara1.textContent = `Issue Id: ${issue.iid}`;
    section.appendChild(myPara1);
  
    const myPara2 = document.createElement('p');
    myPara2.textContent = `Status: ${issue.state}`;
    section.appendChild(myPara2);
  
    const myPara3 = document.createElement('p');
    myPara3.textContent = `Assignee: ${issue.assignee}`;
    section.appendChild(myPara3);
  
    const myTable = document.createElement('div');
    myTable.innerHTML = issue.description;
    myTable.className = 'client-issue-description';
    section.appendChild(myTable);       
  }

/**
 * This function will change the title name, depending on the frmCltRequestType selected
 */
function changeRequestTitle(issue) {
    //initialize variable with an empty string so it doesn't cause an 'undefined' error if
    //the value doesn't exist
    //let newParsedIssueTitle = "";
    //get the whole issue object
    console.log("issue: ", issue);
    
    //const stringifiedIssue = JSON.stringify(issue);
    //console.log("stringifiedIssue: ", stringifiedIssue);
    //const parsedIssue = JSON.parse(stringifiedIssue);
    //console.log("parsedIssue: ", parsedIssue);
    //get the value requestType element
    //let parsedIssueTitle = JSON.stringify(parsedIssue.title);
    //console.log("parsedIssueTitle: ", parsedIssueTitle);
    //console.log("parsedIssueTitle: ", parsedIssueTitle);
    //assumes the second label is the environment
    const envrionmentName = issue.labels[1];

    const titlesMap = {
        "newProd": "Request for a New Service Account to call the Software Factory enterprise web services Environment: Production",
        "modifyProd": "Request to Modify the Access of a Service Account to call the Software Factory enterprise web services Environment: Production",
        "newNonProd": "Request for a New Service Account to call the Software Factory enterprise web services Environment: Non-Production",
        "modifyNonProd": "Request to Modify the Access of a Service Account to call the Software Factory enterprise web services Environment: Non-Production"
    }

    issue.title = titlesMap[envrionmentName] || "undefined title";


    // switch(envrionmentName){
    //     case "newProd":
    //         issue.title = "Request for a New Service Account to call the Software Factory enterprise web services Environment: Production";
    //         break;
    //     case "modifyProd":
    //         issue.title = "Request to Modify the Access of a Service Account to call the Software Factory enterprise web services Environment: Production";
    //         break;
    //     case "newNonProd":
    //         issue.title = "Request for a New Service Account to call the Software Factory enterprise web services Environment: Non-Production";
    //         break;
    //     case "modifyNonProd":
    //         issue.title = "Request to Modify the Access of a Service Account to call the Software Factory enterprise web services Environment: Non-Production";
    //         break;
    //     default:
    //         throw new Error("your request type is invalid");
    // }


    // if(envrionmentName === "newProd"){
    //     issue.title = "Request for a New Service Account to call the Software Factory enterprise web services Environment: Production";
    // }
    // else if(envrionmentName === "modifyProd"){
    //     issue.title = "Request to Modify the Access of a Service Account to call the Software Factory enterprise web services Environment: Production";
    // }
    // else if(envrionmentName === "newNonProd"){
    //     issue.title = "Request for a New Service Account to call the Software Factory enterprise web services Environment: Non-Production";
    // }
    // else if(envrionmentName === "modifyNonProd"){
    //     issue.title = "Request to Modify the Access of a Service Account to call the Software Factory enterprise web services Environment: Non-Production";
    // }
    // else {
    //     throw new Error("your request type is invalid");
    // }

    // let issueString = JSON.stringify(issue);
    // let parsedIssue = JSON.parse(issueString, function(key, value){
    //     if(key === "title"){
    //         if(value.includes("newProd")){
    //             return "Request for a New Service Account to call the Software Factory enterprise web services Environment: Production";
    //         }
    //         else if(value.includes("modifyProd")){
    //             return "Request to Modify the Access of a Service Account to call the Software Factory enterprise web services Environment: Production";
    //         }
    //         else if(value.includes("newNonProd")){
    //             return "Request for a New Service Account to call the Software Factory enterprise web services Environment: Non-Production";
    //         }
    //         else if(value.includes("modifyNonProd")){
    //             return "Request to Modify the Access of a Service Account to call the Software Factory enterprise web services Environment: Non-Production";
    //         }
    //         else {
    //             return "your request type is invalid";
    //         }
    //     }
    //     return value;
    // });
    //original issue: before the change
    //console.log("old issue: ", issue);

    //assign parsedIssue to replace issue
    //issue = parsedIssue;
    console.log("new issue: ", issue);

    return issue;


    //console.log("new parsedIssue: ", parsedIssue);
    //console.log("new issue title: ", parsedIssue.title);

    //change the request title
    // if(parsedIssueTitle.includes("newProd")){
    //     parsedIssueTitle = "Request for a New Service Account to call the Software Factory enterprise web services Environment: Production";
    //     console.log("updated parsedIssueTitle: ", parsedIssueTitle);
    //     console.log("new parsedIssue: ", parsedIssue);
    //     //newParsedIssue = JSON.parse(stringifiedIssue);
    //     //console.log("newParsedIssue: ", newParsedIssue);
    // }
    // else {
    //     console.log("your request type is invalid");
    // }
    

    //change the name, depending on the selected requestType
    // switch (stringifiedIssueTitle){
    //     case stringifiedIssueTitle.includes("newNonProd"):
    //         stringifiedIssueTitle = "Request for a New Service Account to call the Software Factory enterprise web services Environment: Non-Production";
    //         newParsedIssueTitle = JSON.parse(stringifiedIssueTitle);
    //         break;
    //     case stringifiedIssueTitle.includes("modifyNonProd"):
    //         stringifiedIssueTitle = "Request to Modify the Access of a Service Account to call the Software Factory enterprise web services Environment: Non-Production";
    //         newParsedIssueTitle = JSON.parse(stringifiedIssueTitle);
    //         break;
    //     case stringifiedIssueTitle.includes("newProd"):
    //         stringifiedIssueTitle = "Request for a New Service Account to call the Software Factory enterprise web services Environment: Production";
    //         newParsedIssueTitle = JSON.parse(stringifiedIssueTitle);
    //         break;
    //     case stringifiedIssueTitle.includes("modifyProd"):
    //         stringifiedIssueTitle = "Request to Modify the Access of a Service Account to call the Software Factory enterprise web services Environment: Production";
    //         newParsedIssueTitle = JSON.parse(stringifiedIssueTitle);
    //         break;
    //     default:
    //         console.log("your request type is invalid");
    // }

}


/**
This function loads the client data from GCcode Issue triggered by DOMContentLoaded.
*/
async function onSSCLoad() {
    const issueId = 215;

    const issueData = await fetchIssue(issueId); 

    //changeRequestTitle(issueData); 
    reorderSscData(issueData);
    populateSscSection(issueData);
    
}  