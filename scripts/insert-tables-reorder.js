/**
    This function gets the form data entered by the user (as a parameter) and returns issueData.
    @param formValue The web form data formatted to html tables
   */
    getIssueData(formValue) {
        const issueDataGCcode = {
        title: `${issueDataTitlesMap[formValue.frmCltRequestType] || "undefined title"}; Services: ${formValue.frmCltEwsServices}`,
        confidential: "true",
        labels: `New, ${formValue.frmCltRequestType}, ${formValue.frmCltEwsServices} `,
        description: `${formValue.frmCltAppDesc}<p>
        <table class="info-table app-info">
            <thead>
                <tr id="gcdCltAppInfo" scope="column">
                    <th>Application Info</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Application Environment</th>
                    <td id="gcdCltRequestType">${formValue.frmCltRequestType || ""}</td>
                </tr>
                <tr>
                    <th scope="row">CSD Application Name</th>
                    <td id="gcdCltCsdName">${formValue.frmCltCsdName || ""}</td>
                </tr>
                <tr>
                    <th scope="row">CSD Acronym</th>
                    <td id="gcdCltCsdAcronym">${formValue.frmCltCsdAcronym || ""}</td>
                </tr>            
                <tr>
                    <th scope="row">Application Description</th>
                    <td id="gcdCltAppDesc">${formValue.frmCltAppDesc || ""}</td>
                </tr>            
                <tr>
                    <th scope="row">Project Url in the CSD</th>
                    <td id="gcdCltCsdUrl" target="_blank">${formValue.frmCltCsdUrl || ""}</td>
                </tr>  
                <tr>
                    <th scope="row">Project Team Name</th>
                    <td id="gcdCltTeamName">${formValue.frmCltTeamName || ""}</td>
                </tr> 
                <tr>
                    <th scope="row">Application Distribution List</th>
                    <td id="gcdCltTeamDistList">${formValue.frmCltTeamDistList || ""}</td>
                </tr>                                 
                <tr>
                    <th scope="row">Application Version</th>
                    <td id="gcdCltAppVersion">${formValue.frmCltAppVersion || ""}</td>
                </tr>
                <tr>
                    <th scope="row">Application RFC (ANPR)</th>
                    <td id="gcdCltAppAnpr">${formValue.frmCltAppAnpr || ""}</td>
                </tr>            
                <tr>
                    <th scope="row">Expected Implementation Date</th>
                    <td id="gcdCltImplementDate">${formValue.frmCltImplementDate || ""}</td>
                </tr>                                                   
                <tr>
                    <th scope="row">Application Type</th>
                    <td id="gcdCltAppType">${formValue.frmCltAppType || ""}</td>
                </tr>
                <tr>
                    <th scope="row">Application Zone</th>
                    <td id="gcdCltAppZone">${formValue.frmCltAppZone || ""}</td>
                </tr>
                <tr>
                    <th scope="row">Application in Production</th>
                    <td id="gcdCltExistInProd">${formValue.frmCltExistInProd || ""}</td>
                </tr>
                <tr>
                    <th scope="row">Week-Day Support Hours</th>
                    <td id="gcdCltAppSupportWeekday">${formValue.frmCltAppSupportWeekday || ""}</td>
                </tr>
                <tr>
                    <th scope="row">Week-End Support Hours</th>
                    <td id="gcdCltAppSupportWeekend">${formValue.frmCltAppSupportWeekend || ""}</td>
                </tr>
                <tr>
                    <th scope="row">Criticality Classification</th>
                    <td id="gcdCltCriticality">${formValue.frmCltCriticality || ""}</td>
                </tr>
                <tr>
                    <th scope="row">Incident Support Coverage</th>
                    <td id="gcdCltSupportCoverage">${formValue.frmCltSupportCoverage || ""}</td>
                </tr>
                <tr>
                    <th scope="row">Application Hosting Site</th>
                    <td id="gcdCltAppHostSite">${formValue.frmCltAppHostSite || ""}</td>
                </tr>
                <tr>
                    <th scope="row">Database Hosting Site</th>
                    <td id="gcdCltDbHostSite">${formValue.cltDbHostSite || ""}</td>
                </tr> 
                <tr>
                    <th scope="row">Application Usage Details</th>
                    <td id="gcdCltAppUsageDetails">${formValue.frmCltAppUsageDetails || ""}</td>
                </tr>                                                                                                                       
            </tbody>
        </table>
    </p>`};

    console.log("issue data: ", issueDataGCcode);
    return issueDataGCcode;
}

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

    const newTitleIssueData = changeRequestTitle(issueData);
    console.log("fetchIssue newTitleIssueData: ", newTitleIssueData);

    return newTitleIssueData;

    
}


/**
This function gets the form data entered by the user (as a parameter) and returns issueData.
Add sectionStartTag and sectionEndTag to the original client data (getIssueData??), 
to wrap around the client info data tables  want to keep together.
Then extract the paragraph from the client's application description.
Then store it as a separate variable(?), that can be placed anywhere i choose.
Then insert that variable in getIssueData, before the client data tables.
This way, if the tables are ordered differently, the client's application description will always remain at the top.
string split into an array of strings: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
@param issueData The web form data formatted to html tables
*/
function extractText(issueData, formValue) {
    //const formValue = "TSSCR11 application description I entered";
    //console.log("formValue: ", formValue);
  
    const indexStart = issueData.description.indexOf(formValue.frmCltAppDesc, 0);
    console.log("indexStart: ", indexStart);
    const indexEnd = issueData.description.indexOf(`<p>`);
    console.log("indexEnd: ", indexEnd);
    //extract the clientText from description value
    const clientText = issueData.description.substring(indexStart, indexEnd);
    console.log("clientText: ", clientText);
  
    //create section tags, to mark the start and end of the html client tables
  const sectionStartTag = "<!--client-section-start-->";
  const sectionEndTag = "<!--client-section-end-->";
  
  if(issueData.description.includes(sectionStartTag)){
      const indexClientTableStart = issueData.description.indexOf(sectionStartTag);
      console.log("indexClientTableStart: ", indexClientTableStart);
      const indexClientTableEnd = issueData.description.indexOf(sectionEndTag) + sectionEndTag.length;
      console.log("indexClientTableEnd: ", indexClientTableEnd);
  }
  
  
  //replace clientText with an empty string
  const clientTables = issueData.description.replace(clientText, ``);
  console.log("clientTables: ", clientTables);
  //wrap the html client tables inside a sectionStartTag and sectionEndTag
  const newClientTables = sectionStartTag.concat(clientTables, sectionEndTag);
  console.log("newClientTables: ", newClientTables);
  
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
    //Returns the starting point of the end of the string. sectionEndTag.length will return the end of the string
    const endIndex = issueData.description.indexOf(sectionEndTag) + sectionEndTag.length;

    //this selects only the Sds data table
    const sdsTable = issueData.description.substring(startIndex) + issueData.description.substring(endIndex);

    //this selects only the client data tables (no Sds table)
    issueData.description = issueData.description.substring(0, startIndex) + issueData.description.substring(endIndex);
    
    //this will concatinate all client data tables, putting the sds table at the beginning
    const newDescription = sdsTable.concat(issueData.description);

    //This will return the Sds table, client tables in the new order
    issueData.description = newDescription;        
    }  


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

    const myPara4 = document.createElement('p');
    myPara4.textContent = `Application Description: ${issue.clientText}`;
    section.appendChild(myPara4);
  
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
    return issue;
}


/**
This function loads the client data from GCcode Issue triggered by DOMContentLoaded.
*/
async function onSSCLoad() {
    
    const issueId = 231;
    const issueData = await fetchIssue(issueId); 

    extractText(issueData);
    reorderSscData(issueData);
    populateSscSection(issueData);
    
}  