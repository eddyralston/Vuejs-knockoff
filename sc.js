
const html = str => {
    var el = document.createElement('div');
    el.innerHTML = str;
    return el.firstElementChild
}
function component(setup){

    const queryElements = (parent,queryString,callback)=>{
        var query = parent.querySelectorAll('['+queryString+']')
        for (var i = 0; i < query.length; i++) {
            var child = query[i]
            child.on=(event,callback)=>{child.addEventListener(event,callback)}
            var attr = child.getAttribute(queryString)
            callback(child,attr)
        }
    }
    var host = html(setup.html)
    host.data = {}
    host.events = setup.events
    queryElements(host,'model',(child,key)=>{
        Object.defineProperty(host.data, key, { 
            get:()=>{return child.value || child.innerText},
            set:(string)=>{child.value = child.innerText = string;}
        });
        host.data[key] = setup.data[key];
    })
    queryElements(host,'event',(child,name)=>{
        var namePart = name.split(':')
        child.on(namePart[0],()=>host.events[namePart[1]](host))
    })
    return host
}
