const getters = {
  rank: state => state.user.rank,
  id: state => state.user.id,
  name: state => state.user.name,
  mobile: state => state.user.mobile,
  headThumb: state => state.user.headThumb,
  type: state => state.user.type
}
export default getters
