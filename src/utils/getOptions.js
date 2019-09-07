export function getParentOptions(source) {
    const tmp = {}
    let n
    for (n in source) {
      const item = source[n]
      tmp[n] = []
      tmp[n].label = item.level
      tmp[n].value = item.level
    }
    return tmp
  }
  export function getLevelOptions(source) {
    const tmp = {}
    let n
    for (n in source) {
      const item = source[n]
      tmp[n] = []
      tmp[n].label = item.parentDepartment
      tmp[n].value = item.parentId
    }
    return tmp
  }