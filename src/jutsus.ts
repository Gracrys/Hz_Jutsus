interface Jutsus {
  jutsus :  Jutsu 
}

interface Jutsu {
  name : String,
  romanji : String,
  element : String,
  kanji : String,
  details ?: {
    spread : Number,
    distance : Number
  }
}

export const jutsus = {
   "pynomy" : {
     name: "Fire Element; Balsam Spread Fire",
     romanji: "Katon style: Hōsenka no Jutsu ",
     element: "Katon",
     kanji: "火遁・鳳仙火の術"
   },
  "yph" : {
     name: "Fire Element; Fire Dragon Flame Missile",
     romanji: "Katon style: Karyūdan",
     element: "Katon",
    kanji: "火遁・火龍弾"
   },
     "yphy" : {
     name: "Fire Element; Great Dragon Fire Technique",
     romanji: "Katon style: ",
     element: "Katon",
    kanji: "火遁"
   },
  "ypij" : {
    name: "Fire Release: Exploding Flame Formation",
    romaji: "Katon: Kibaku Enjin",
    element: "katon",
    kanji: "火遁・起爆炎陣­"
  },
    "jlbuky":{ 
      name: "Fire Release: Great Fireball Technique",
      romaji: "Katon: Gōkakyū no Jutsu",
      element: "katon",
      kanji: "火遁・豪火球の術­­"
    },
      "yk":{ 
      name: "Fire Release: Great Blaze Ball",
      romaji: "Katon: Gōenkyū",
      element: "katon",
      kanji: "火遁・豪焔球­­"
    },
  "y":{
    name:"Fire Release: Great Flame Flower",
    romanji:"Katon: Gōenka",
    element:"Katon",
    kanji:"火遁・豪炎華",
  },
    "yiuo":{
  name:"Fire Release: Phoenix Sage Fire Technique",
  romanji:"Katon: Hōsenka no Jutsu",
  element:"Katon",
  kanji:"火遁・鳳仙火の術"
},
}


export const handSigns = {
  "y": {
    name: "tiger",
    sign: "",
    romanji: "tora",
    emoji: "🐯"
  },
   "u": {
    name: "boar",
    sign: "",
    romanji: "I",
    emoji: "🐗"
  }, 
  "i": {
    name: "bird",
    sign: "",
    romanji: "tori",
    emoji: "🐦"
  }, 
  "p": {
    name: "rat",
    sign: "",
    romanji: "ne",
    emoji: "🐭"
  },
  "o": {
    name: "ox",
    sign: "",
    romanji: "ushi",
    emoji: "🐮"
  },
  "m": {
    name: "rabbit",
    sign: "",
    romanji: "u",
    emoji: "🐰"
  },
  "h": {
    name: "dragon",
    sign: "",
    romanji: "tatsu",
    emoji: "🐲"
  },
  "j": {
    name: "snake",
    sign: "",
    romanji: "mi",
    emoji: "🐍"
  },
  "k": {
    name: "horse",
    sign: "",
    romanji: "uma",
    emoji: "🐴"
  },
  "l": {
    name: "ram",
    sign: "",
    romanji: "hitsuji",
    emoji: "🐑"
  },
  "b": {
    name: "monkey",
    sign: "",
    romanji: "saru",
    emoji: "🐵"
  },
  "n": {
    name: "dog",
    sign: "",
    romanji: "inu",
    emoji: "🐶"
  },

}

/*
 *
 * Presumably:

Water: wet the leaf

Lightning: Pierce the leaf

Fire: burn the leaf

Earth: crumble the leaf.

Wind: cut the leaf
  */

export const technique = (j) => {
  const ob = []
  Object.keys(jutsus).forEach(function(keyName) {
    // using index of to check if the object key name have a matched string
    if (keyName.includes(j) ) {
      ob.push(jutsus[keyName])
    }
  })
  return ob 
}
