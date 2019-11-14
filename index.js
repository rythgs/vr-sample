import React from 'react'
import {
  AppRegistry,
  Environment,
  StyleSheet,
  Text,
  View,
  VrButton,
  Image,
  asset
} from 'react-360'

class Background extends React.Component {
  constructor(props) {
    super()
    Environment.setBackgroundImage(props.url, { format: props.format })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.url !== this.props.url) {
      Environment.setBackgroundImage(nextProps.url, {
        format: this.props.format
      })
    }
  }

  render() {
    return null
  }
}

export default class VrSample extends React.Component {
  state = {
    index: 0
  }

  next = () => {
    let next = this.state.index - 1
    if (next < 0) {
      next += this.props.photos.length
    }

    this.setState({
      index: next
    })
  }

  prev = () => {
    this.setState({
      index: this.state.index + 1
    })
  }

  render() {
    const current = this.props.photos[
      this.state.index % this.props.photos.length
    ]
    return (
      <View style={styles.wrapper}>
        <Background url={current.url} format={current.format} />
        <View style={styles.controls}>
          <VrButton style={styles.button} onClick={this.prev}>
            <Text style={styles.buttonText}>{'<'}</Text>
          </VrButton>
          <VrButton style={styles.button} onClick={this.next}>
            <Text style={styles.buttonText}>{'>'}</Text>
          </VrButton>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 600,
    width: 1000
  },
  controls: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 800,
    padding: 10
  },
  button: {
    backgroundColor: '#c0c0d0',
    borderRadius: 5,
    width: 40,
    height: 44
  },
  buttonText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold'
  }
})

AppRegistry.registerComponent('VrSample', () => VrSample)
