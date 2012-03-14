//we want the traversal algorithth as fast as possible, so we don't take an object-oriented style

function union(a, b) {
  /*
    TODO Array.concat is slow!
  */
  return a.concat(b);
}

function diff(a, b, keyName) {
  var i, keys, ret, j;
  i = b.length;
  keyName = keyName || "id";
  keys = [];
  ret = [];
  while(i--) {
    keys.push(b[i][keyName]);
  }
  i = a.length;
  while(i--) {
    j = keys.indexOf(a[i][keyName]); 
    if(j > -1) {//we found the same element in both a & b
      keys.splice(j, 1);//keys are unique; we don't need to filter the same key more than once
      continue;
    }
    ret.push(a[i]);
  }
  return ret;
}

function intersect(a, b, keyName) {
  var i, keys, ret, j;
  
  keyName = keyName || "id";
  keys = [];
  ret = [];
  i = b.length;//assuming b is a smaller set than a
  while(i--) {
    keys.push(b[i][keyName]);
  }
  i = a.length;
  while(i--) {
    j = keys.indexOf(a[i][keyName]);
    if(j > -1) {
      keys.splice(j, 1);
      ret.push(a[i]);
    }
  }
  return ret;
}

/*
  TODO Improving traversal by reducing the ctx gradually
*/
function logic_traverse(root, ctx, evaluate) {
  var L, R, logic, ret;
  if(root) {
    L = logic_traverse(root.left, ctx, evaluate);
    R = logic_traverse(root.right, ctx, evaluate);
    logic = root.logic;
    if(logic == "AND") {
      ret = intersect(L, R);
    } else if(logic == "OR") {
      ret = union(L, R);
    } else {//single condition
      ret = evaluate(root, ctx);
    }
  }
  return ret;
}

module.exports = logic_traverse;