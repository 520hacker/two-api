export function loadChat(key) { 
   var json =  localStorage.getItem(key) || '[]';
   return JSON.parse(json);
}

export function saveChat(key, data) {
    if(!data)
    return;

    var json = JSON.stringify(data)
    localStorage.setItem(key, json);
    return;
}
