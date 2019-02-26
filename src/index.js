import React, { Component, Fragment } from 'react'
//import PropTypes from 'prop-types'

import styles from './styles.css'

function Arrow() {
  return <div dangerouslySetInnerHTML={{__html: "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' viewBox='0 0 306 306' style='enable-background:new 0 0 306 306;' xml:space='preserve' class='><g transform='matrix(-1 1.22465e-16 -1.22465e-16 -1 306 306)'><g><g id='chevron-right'><polygon points='94.35,0 58.65,35.7 175.95,153 58.65,270.3 94.35,306 247.35,153   ' data-original='#000000' class='active-path' /></g></g></g> </svg>"}} />
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
    let distanceToScroll = (40)
    let scrollL = sliderRef.current.scrollLeft

    this.setState({scrollLeftWidth: scrollL})

    if (direction === 'right') {
      sliderRef.current.scrollLeft += distanceToScroll
    } else if (direction === 'left') {
      sliderRef.current.scrollLeft -= distanceToScroll
    }
  }

  handleScrolled = (sliderRef) => {
    setTimeout(() => {
      let offsetW = sliderRef.current.offsetWidth
      let scrollL = sliderRef.current.scrollLeft
      let clientW = sliderRef.current.clientWidth
      let scrollRight = Math.floor(sliderRef.current.scrollWidth - (scrollL + clientW))
      let scrollRightOne = Math.floor(sliderRef.current.scrollWidth - (scrollL + clientW) + 1)
      let scrollRightTwo = Math.floor(sliderRef.current.scrollWidth - (scrollL + clientW) + 2)

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
    const {productCount, children} = this.props
    const showArrows = productCount >= 4 || !productCount 
    const arrowSize = styles.sliderArrowsArrowSmall
    const arrowImgSize = styles.sliderArrowsImgSmall
    const showLeft = this.state.left ? styles.sliderArrowsActive : styles.sliderArrowsInactive
    const showRight = this.state.right ? styles.sliderArrowsActive : styles.sliderArrowsInactive

    return (
      <div className={styles.sliderArrowsContainer}>
        {
          showArrows &&
          <button
            aria-label='left slider button'
            onClick={() => this.handleScroll('left', this.categorySliderRef)}
            className={[styles.sliderArrowsArrow, arrowSize, showLeft, styles.sliderArrowsArrowLeft].join(' ')}>
            <div className={styles.left}>
              <Arrow  />
            </div>
          </button>
        }
        <div ref={this.categorySliderRef} className={styles.sliderArrowsChildren}>
          {children}
        </div>
        {
          showArrows &&
          <button
            aria-label='right slider button'
            onClick={() => this.handleScroll('right', this.categorySliderRef)}
            className={[styles.sliderArrowsArrow, arrowSize, showRight, styles.sliderArrowsArrowRight].join(' ')}>
            <Arrow />
          </button>
        }
      </div>
    )
  }
}

export default SliderArrows
