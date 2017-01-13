data = {
  "items":[
    {
        "id": 0,
        "name": "Ruined Sword",
        "description": "- A ruined sword",
        "stats":{
            "attack": "Attack is 2",
            "durability": "Durability is 3"
        }
    },
    {
        "id": 1,
        "name": "Another Ruined Sword",
        "description": "- Another ruined sword. Definitely the worst item in the entire game.",
        "stats":{
            "attack": "Attack is 1",
            "durability": "Durability is 3"
        }
    }
  ]
}

// removeItemFromInventory = function(inv, id){
//   inv.items.pop(id)
//   console.log(inv.items)
//   // for (i=0; i<inv.length; i++){
//   //   // inv.items[i].id.splice(id)
//   //   console.log(inv.items)
//   //   break;
//   // }
//   buildItemInventory(inv);
// }
var deleteItemButton;
buildItemInventory = function(inventory){
  for (i=0; i<inventory.items.length; i++){
    var listings = document.getElementById('listings');
    itemName =  inventory.items[i].name;
    var listing = listings.appendChild(document.createElement('div'));
    listing.className = 'item';
    listing.id = 'listing-' + i;

    var item = listing.appendChild(document.createElement('div'));
    item.className = 'itemName';
    item.dataPosition = i;
    item.innerHTML = itemName;

    var itemDescription = item.appendChild(document.createElement('p'));
    itemDescription.className = "itemDescription";
    itemDescription.innerHTML = inventory.items[i].description;

    var itemAttackStats = item.appendChild(document.createElement('p'));
    itemAttackStats.className = "itemAttackStats";
    itemAttackStats.innerHTML = inventory.items[i].stats.attack;

    var itemDurabilityStats = item.appendChild(document.createElement('p'));
    itemDurabilityStats.className = "itemDurabilityStats";
    itemDurabilityStats.innerHTML = inventory.items[i].stats.durability;

    var deleteItemButton = item.appendChild(document.createElement('BUTTON'));
    textNode = document.createTextNode("Delete");
    deleteItemButton.appendChild(textNode);
  }

  //call outside of loop!

}

buildItemInventory(data);

// deleteItemButton.onclick = removeItemFromInventory(data, 1);
