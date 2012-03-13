start
  = disjunction

disjunction
 = d:(conjunction OR disjunction) { return { left: d[0], logic: d[1], right: d[2] }; }
 / conjunction
  
conjunction
 = c:(statement AND conjunction) { return { left: c[0], logic: c[1], right: c[2] }; }
 / statement

statement
  = query
  / s:( ws? "(" ws? disjunction ws? ")" ws? ) { return s[3]; }

query
 = q:(ws? key ws? operator ws? value ws?) { return {key: q[1], value: q[5], operator: q[3] }; }
 
operator
  = "=" 
  / "!="
  / "<=" 
  / ">=" 
  / "<" 
  / ">" 
  / "BEGINS_WITH" 
  / "ENDS_WITH" 
  / "CONTAINS" 
  / "MATCHES" 
  / "TYPE_IS"

condition
  = c:(ws? (AND / OR) ws?) { return c[1]; }
  
key
  = k:string
  
value
  = v:(stringValue / reservedWords / numericValue / regEXP / variable)
  
regEXP
   = r:( "/" string "/") { return new RegExp(r[1]); }

stringValue
  = s:(quote ws? string ws? quote)  { return s[2]; }

numericValue
  = n:(ws? number ws?) { return n[1]; }

reservedWords
  = r:("NULL" / "null" / "undefined" / "false" / "true") {
    var values = {
      "NULL": null,
      "undefined": undefined,
      "false": false,
      "true": true
    };
    return values[r];
  }

variable
  = v:("{" string "}") { return v.join(""); }

quote
  = "\'" / "\""

AND
  = a:("and" / "&&" / "AND") { return a.toUpperCase(); }
  
OR
  = o:("or" / "||" / "OR") { return o.toUpperCase(); }

ws
  = " "+ { return ""; }
  
number "number"
  = number:[0-9\.]+ { return parseFloat(number.join(""), 10); }

string "string"
  = strings:[a-zA-Z0-9\.\*\?\+\:]+ { return strings.join(""); }