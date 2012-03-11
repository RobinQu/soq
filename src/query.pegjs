start
  = statement

statement
  = case+
  
case
  = c:(condition? query) { c[1].condition = c[0]? c[0] : "*"; return c[1]; }
  
query
  = q:(ws? key ws? operator ws? value ws?) { return {key: q[1], value: q[5], operator: q[3] }; }

quote
  = "\'" / "\""

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
  = "NULL" / "null" / "undefined" / "false" / "true"

variable
  = v:("{" string "}") { return v.join(""); }

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