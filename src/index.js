import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

const RightArrow = () => {
  return <div dangerouslySetInnerHTML={{__html: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 129 129' xmlns:xlink='http://www.w3.org/1999/xlink' enable-background='new 0 0 129 129'><g><path d='m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z'/></g></svg>"}} />
}

const LeftArrow = () => {
  return <div dangerouslySetInnerHTML={{__html: "<svg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 477.175 477.175' style='enable-background:new 0 0 477.175 477.175;' xml:space='preserve'><g><path d='M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z'/></g></svg>"}} />
}

class SliderArrows extends Component {
  constructor(props) {
    super(props)
    this.state = {
      left: false,
      right: true,
      timeout: null,
      childLength: null
    }

    this.categorySliderRef = React.createRef()
  }

  componentDidMount() {
    this.setState({ childLength: this.categorySliderRef.current.children[0].offsetWidth })
  }

  between = (x, min, max) => {
    return x >= min && x <= max
  }

  handleScroll = (direction) => {
    let sliderRef = this.categorySliderRef
    let childLength = this.categorySliderRef.current.children[0].offsetWidth
    const distanceToScroll = (childLength)

    if (this.state.right === false && direction === 'right') {
      sliderRef.current.scrollLeft = 0
    } else if (this.state.left === false && direction === 'left') {
      sliderRef.current.scrollLeft = sliderRef.current.scrollWidth
    }

    if (direction === 'right') {
      sliderRef.current.scrollLeft += distanceToScroll
    } else if (direction === 'left') {
      sliderRef.current.scrollLeft -= distanceToScroll
    }
  }

  handleScrolled = () => {
    let sliderRef = this.categorySliderRef
    const offsetW = sliderRef.current.offsetWidth
    const scrollL = sliderRef.current.scrollLeft
    const clientW = sliderRef.current.clientWidth
    const scrollR = Math.floor(sliderRef.current.scrollWidth - (scrollL + clientW))

    if (this.between((offsetW + scrollL), offsetW - 5, offsetW + 5)) {
      this.setState({left: false})
    } else {
      this.setState({left: true})
    }

    if (this.between((offsetW + scrollR), offsetW - 5, offsetW + 5)) {
      this.setState({right: false})
    } else {
      this.setState({right: true})
    }
  }

  render() {
    const { children, arrowSize, productsInView } = this.props

    const showLeft = this.state.left ? styles.sliderArrowsActive : styles.sliderArrowsInactive
    const showRight = this.state.right ? styles.sliderArrowsActive : styles.sliderArrowsInactive

    let size
    if (arrowSize === 'small') {
      size = styles.sliderArrowsArrowSmall
    } else if (arrowSize === 'medium') {
      size = styles.sliderArrowsArrowMedium
    } else if (arrowSize === 'large') {
      size = styles.sliderArrowsArrowLarge
    } else {
      size = styles.sliderArrowsArrowSmall
    }

    let width
    if (typeof productsInView === 'string') {
      width = '100%'
    } else if (typeof productsInView === 'number') {
      width = `${this.state.childLength * productsInView}px`
    }

    const childrenWithWrapperDiv = React.Children.map(children, child => {
      return (
        <div className={styles.snap}>{child}</div>
      )
    })

    return (
      <div className={styles.sliderArrowsContainer}>

        <button
          aria-label='left slider button'
          onClick={() => this.handleScroll('left')}
          className={[styles.sliderArrowsArrow, size, styles.sliderArrowsArrowLeft].join(' ')}>
          <div className={showLeft}>
            <LeftArrow />
          </div>
        </button>

        <div
          style={{width: width}}
          onScroll={() => {
            clearTimeout(this.state.timeout)
            this.setState({
              timeout: setTimeout(() => {
                this.handleScrolled()
              }, 100)
            })
          }}
          ref={this.categorySliderRef}
          className={styles.sliderArrowsChildren}
        >
          {childrenWithWrapperDiv}
        </div>

        <button
          aria-label='right slider button'
          onClick={() => this.handleScroll('right')}
          className={[styles.sliderArrowsArrow, size, styles.sliderArrowsArrowRight].join(' ')}>
          <div className={showRight}>
            <RightArrow />
          </div>
        </button>

      </div>
    )
  }
}

export default SliderArrows

SliderArrows.defaultProps = {
  arrowSize: 'small',
  productsInView: 2
}

SliderArrows.propTypes = {
  arrowSize: PropTypes.string,
  productsInView: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}
