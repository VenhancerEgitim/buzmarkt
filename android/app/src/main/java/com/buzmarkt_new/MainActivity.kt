package com.buzmarkt_new

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "buzmarkt_new"

  /**
   * React Navigation için gerekli
   */
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)
  }

  /**
   * Returns the instance of the [ReactActivityDelegate]. Here we use a util class [DefaultReactActivityDelegate]
   * which allows you to easily enable Fabric and Concurrent React (aka React 18) with two boolean flags.
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return DefaultReactActivityDelegate(
      this,
      mainComponentName,
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      DefaultNewArchitectureEntryPoint.fabricEnabled
    )
  }
}
