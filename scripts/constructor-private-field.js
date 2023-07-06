class IssueApi {
    #serverUrl;
    #projectId;
    #privateToken;
    
    constructor() {
      this.#serverUrl = "https://gccode.ssc-spc.gc.ca/";
      this.#projectId = 45;
      this._privateToken = "myJoseePrivateToken";
    }
    //getter
    get secureApiDetails() {
      return this.#serverUrl, this.#projectId, this._privateToken;
    }
  }
  
  const issueApi = new IssueApi();
  console.log(issueApi.secureApiDetails);


  /*Use static properties?? */
  class IssueApi {
    //static properties and methods are inherited
    static serverUrl = "https://gccode.ssc-spc.gc.ca/";
    static projectId = 45;
    static privateToken = "myJoseePrivateToken";
    
    constructor(serverUrl, projectId, privateToken) {
      this.serverUrl = serverUrl;
      this.projectId = projectId;
      this.privateToken = privateToken;
    }
    
    
  }
  
  console.log(IssueApi.serverUrl);
  console.log(IssueApi.projectId);
  console.log(IssueApi.privateToken);


  /*assign the values outside of the class??*/
  class IssueApi {
    //static properties and methods are inherited
    //static serverUrl = "https://gccode.ssc-spc.gc.ca/";
    //static projectId = 45;
    //static privateToken = "myJoseePrivateToken";
    
    constructor(serverUrl, projectId, privateToken) {
      this.serverUrl = serverUrl;
      this.projectId = projectId;
      this.privateToken = privateToken;
    }
    
    
  }
  const gccodeDetails = new IssueApi("https://gccode.ssc-spc.gc.ca/", 45, "myJoseePrivateToken");
  console.log(gccodeDetails);

/*Use this way, to define values inside the constructor*/
class IssueApi {
    
    constructor() {
      this.serverUrl = "https://gccode.ssc-spc.gc.ca/";
      this.projectId = 45;
      this.privateToken = "myJoseePrivateToken";
    }
    
    
  }
  
  const gccodeDetails2 = new IssueApi();
  console.log(gccodeDetails2.serverUrl);
  console.log(gccodeDetails2.projectId);
  console.log(gccodeDetails2.privateToken);
  