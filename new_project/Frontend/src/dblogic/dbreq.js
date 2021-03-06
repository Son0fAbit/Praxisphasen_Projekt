var db = {

    server: 'http://localhost:5000/api/links',



    // GETS all links from server, !!!!! ADD ERROR HANDELING !!!!!!
    getLinks() {
        return new Promise((resolve) => {
          var xhr = new XMLHttpRequest();
          xhr.open('GET',this.server,true)
          xhr.onload = function(){
              var links = JSON.parse(this.responseText);
              resolve(links)
          }
          xhr.onerror = function(){
            alert("Server unreachable")
            console.log("GET Request to server was unsuccessfull, server either unavailable or not connected to the internet")
          }
          xhr.send()
        })  
      },



      getLinksbyDomain(domain) {
        return new Promise((resolve) => {
          var xhr = new XMLHttpRequest();
          xhr.open('GET',`${this.server}/domain=${domain}`,true)
          xhr.onload = function(){
              var links = JSON.parse(this.responseText);
              resolve(links)
          }
          xhr.onerror = function(){
            alert("Server unreachable")
            console.log("GET Request to server was unsuccessfull, server either unavailable or not connected to the internet")
          }
          xhr.send()
        })  
      },

      //persist Update
    
    updateLink(id,editedObject){


      return new Promise((resolve) => {

        var xhr = new XMLHttpRequest();
            xhr.open('PUT',`${this.server}/id=${id}`,true)
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
            xhr.onload = function(){
              if(this.status != 200){
                resolve(this.responseText)
              } else {
                resolve()
              }
            }
            xhr.onerror = function(){
              resolve("PUT Request to server was unsuccessfull, server either unavailable or not connected to the internet")
            }
  
            xhr.send(JSON.stringify(editedObject))
            
      })  
            
      },
      //persist Insert

    insertLink(insertedObject){
        var xhr = new XMLHttpRequest();
        xhr.open('POST',`${this.server}`,true)
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
        xhr.onerror = function(){
          console.log("POST Request to server was unsuccessfull, server either unavailable or not connected to the internet")
        }

        xhr.send(JSON.stringify(insertedObject))
  },

      //persist Delete

    deleteLink(id){
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE',`${this.server}/id=${id}`,true)
        xhr.onerror = function(){
          console.log("DELETE Request to server was unsuccessfull, server either unavailable or not connected to the internet")
        }
        xhr.send()
    },



}


module.exports = db;