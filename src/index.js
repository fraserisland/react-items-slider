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
      scrollLeftWidth: null
    }

    this.categorySliderRef = React.createRef()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.scrollLeftWidth !== this.state.scrollLeftWidth) {
      this.handleScrolled(this.categorySliderRef)
    }
  }

  handleScroll = (direction, sliderRef) => {
    const childLength = this.categorySliderRef.current.children[0].offsetWidth
    const distanceToScroll = (childLength)

    const scrollL = sliderRef.current.scrollLeft
    this.setState({scrollLeftWidth: scrollL})

    if (direction === 'right') {
      sliderRef.current.scrollLeft += distanceToScroll
    } else if (direction === 'left') {
      sliderRef.current.scrollLeft -= distanceToScroll
    }
  }

  handleScrolled = (sliderRef) => {
    setTimeout(() => {
      const offsetW = sliderRef.current.offsetWidth
      const scrollL = sliderRef.current.scrollLeft
      const clientW = sliderRef.current.clientWidth
      const scrollRight = Math.floor(sliderRef.current.scrollWidth - (scrollL + clientW))
      const scrollRightOne = Math.floor(sliderRef.current.scrollWidth - (scrollL + clientW) + 1)
      const scrollRightTwo = Math.floor(sliderRef.current.scrollWidth - (scrollL + clientW) + 2)

      if (offsetW + scrollL === offsetW) {
        this.setState({left: false})
      } else {
        this.setState({left: true})
      }

      if (offsetW + scrollRight === offsetW || offsetW + scrollRightOne === offsetW || offsetW + scrollRightTwo === offsetW) {
        this.setState({right: false})
      } else {
        this.setState({right: true})
      }
    }, 250)
  }

  render() {
    const { children } = this.props

    const showLeft = this.state.left ? styles.sliderArrowsActive : styles.sliderArrowsInactive
    const showRight = this.state.right ? styles.sliderArrowsActive : styles.sliderArrowsInactive

    const arrowSize = styles.sliderArrowsArrowSmall

    return (
      <div className={styles.sliderArrowsContainer}>

        <button
          aria-label='left slider button'
          onClick={() => this.handleScroll('left', this.categorySliderRef)}
          className={[styles.sliderArrowsArrow, arrowSize, styles.sliderArrowsArrowLeft].join(' ')}>
          <div className={[styles.sliderArrowImg, styles.left, showLeft].join(' ')}>
            <LeftArrow />
          </div>
        </button>

        <div
          ref={this.categorySliderRef}
          className={styles.sliderArrowsChildren}
        >
          {children}
        </div>

        <button
          aria-label='right slider button'
          onClick={() => this.handleScroll('right', this.categorySliderRef)}
          className={[styles.sliderArrowsArrow, arrowSize, styles.sliderArrowsArrowRight].join(' ')}>
          <div className={[styles.sliderArrowImg, styles.right, showRight].join(' ')}>
            <RightArrow />
          </div>
        </button>

      </div>
    )
  }
}

export default SliderArrows

SliderArrows.defaultProps = {
  size: 'small'
}

SliderArrows.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}
