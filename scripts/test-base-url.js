function getBaseUrlForCurrentPage() {  
    //Get the base Url of the current page you're on (client page)
    //const url = new URL(window.location.href);
    //console.log("window.location.href: ", url);
    const url = new URL("https://cenw-wscoe.github.io/sgdc-cdts/docs/guide-decl-gcintranet-en.html?allo=Josee");
    console.log("window.location.href: ", url);
    console.log(url.search);
    //TODO: remove the query string from window.location.href
    const pathSegments = url.pathname.split("/");
    console.log("pathSegments: ", pathSegments);
    //This will remove the last elements of the array (the correct page name)
    pathSegments.splice(pathSegments.length-1, 1);
    console.log("pathSegments spliced: ", pathSegments);
    
    url.pathname = pathSegments.join("/");
    console.log("url.pathname: ", url.pathname);

    //removes the query string at the end
    url.search = "";

    const baseUrl = url.toString();
    console.log("url.toString(): ", baseUrl);
  
    if (baseUrl[baseUrl.length-1] == "/"){
      console.log("baseUrl substring: ", baseUrl.substring(0, baseUrl.length-1));
      return baseUrl.substring(0, baseUrl.length-1);
    }
    console.log("baseUrl: ", baseUrl);
    return baseUrl;
  }

  console.log(getBaseUrlForCurrentPage());  