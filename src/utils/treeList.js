export function getTreeList(source) {
  const tmp = {}
  let n
  for (n in source) {
    const item = source[n]
    if (!tmp[item.code]) {
      tmp[item.code] = {}
    }
    item.parentId = convert(item.parentId)
    tmp[item.code] = item
    // tmp[item.code].name = item.name
    // tmp[item.code].code = item.code
    // tmp[item.code].parentId = item.parentId
    if (!('children' in tmp[item.code]))tmp[item.code].children = []
    if (item.code !== item.parentId) {
      if (tmp[item.parentId]) {
        tmp[item.parentId].children.push(tmp[item.code])
      } else {
        tmp[item.parentId] = { children: [tmp[item.code]] }
      }
    }
  }
  console.log(tmp)
  return tmp
}

export function getQueryList(source) {
  const tmp = {}
  let n
  for (n in source) {
    const item = source[n]
    if (!tmp[item.code]) {
      tmp[item.code] = {}
    }
    tmp[item.code].label = item.name
    tmp[item.code].value = item.code
    item.parentId = convert(item.parentId)
    tmp[item.code].parentId = item.parentId
    if (!('children' in tmp[item.code]) && tmp[item.code].parentId.length <= 4)tmp[item.code].children = []
    if (item.code !== item.parentId) {
      if (tmp[item.parentId]) {
        tmp[item.parentId].children.push(tmp[item.code])
      } else {
        tmp[item.parentId] = { children: [tmp[item.code]] }
      }
    }
  }
  getSelectedNode(tmp, null)
  console.log(tmp)
  return tmp['00'].children
}

export function getSelectedNode(source, parent) {
  let n
  for (n in source) {
    const item = source[n]
    if ('children' in item && item.children.length === 0) {
      delete item.children
    } else if ('children' in item && item.children.length) {
      getSelectedNode(item.children, item)
    }
  }
}

export function getParentOptions(source) {
  const tmp = {}
  let n
  for (n in source) {
    const item = source[n]
    tmp[n] = []
    tmp[n].label = item.name
    tmp[n].value = item.code
  }
  return tmp
}

export function convert(number) {
  if ((number + '').length % 2 === 1) {
    return '0' + number
  } else {
    return '' + number
  }
}
