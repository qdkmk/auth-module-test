export default function({ store, $axios, redirect }) {
  $axios.setToken('access_token')
  // 注: ここの引数を今は使わないからと _ とかにするとエラーになる
  $axios.onResponse((config) => {
    $axios.setHeader('Access-Control-Allow-Origin', '*')
  })

  $axios.onRequest((config) => {
    // config.headers.common.Authorization = `Bearer token`
    config.headers.common.Accept = 'application/json'
    if (store.$auth.getToken('local')) {
      $axios.setHeader(
        'Authorization',
        'Bearer ' +
          store.$auth.getToken('local').match(/^Bearer[ ]+([^ ]+)[ ]*$/i)[1]
      )
    }
  })
}
