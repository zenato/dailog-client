import React from 'react'
import App from 'next/app'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from '../store'

const store = createStore(rootReducer)

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}
