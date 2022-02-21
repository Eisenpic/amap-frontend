export default function ({ store, redirect }) {
  if (store.state.auth.user.producteur !== 1) {
    return redirect('/')
  }
}
