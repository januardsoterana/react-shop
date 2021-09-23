import React from 'react';
import {connect} from "react-redux";
import ReactPlayer from "react-player";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"

import {withStyles} from '@material-ui/core/styles';
import {Button, Dialog, Grid} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import arrowLeftIcon from '../../assets/images/arrow-left-1.svg';
import arrowRightIcon from '../../assets/images/arrow-right-1.svg';

const NextArrow = (props) => {
    const {className, style, onClick} = props;
    return (
        <>
            <div className="slick-arrow right" onClick={onClick}>
                <img src={arrowLeftIcon}></img>
            </div>
        </>
    );
};
const PrevArrow = (props) => {
    const {className, style, onClick} = props;
    return (
        <>
            <div className="slick-arrow left" onClick={onClick}>
                <img src={arrowRightIcon}></img>
            </div>
        </>
    );
};

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: 0,
        paddingBottom: '15px'
    },
    closeButton: {
        position: 'absolute',
        right: '20px',
        top: '20px',
        color: '#42413D'
    },
    closeIcon: {
        width: '38px',
        height: '38px'
    }
});

const DialogTitle = withStyles(styles)((props) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6" className="style-look-title">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon className={classes.closeIcon}/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: '0',
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    }
}))(MuiDialogActions);

const StylesDialog = ({open, handleClose, bookThisStyle, styleData, lookIndex}) => {
    const slickSettings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    dots: true
                }
            }
        ],
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>
    };

    return (
        <div>
            <Dialog className="style-detail-modal" onClose={handleClose} aria-labelledby="store-choose-dialog-title"
                    open={open} maxWidth='md'>
                <DialogTitle onClose={handleClose}>
                    {styleData.title}
                </DialogTitle>
                <DialogContent>
                    <div className="video-section">
                        {styleData.featuredVideo && styleData.featuredVideo !== "" &&
                            <div className="video-wrapper">
                                <ReactPlayer url={styleData.featuredVideo}
                                            className='video-player'
                                            width='756px'
                                            height='399px'/>
                            </div>
                        }
                    </div>
                    <div className="slider-row">
                        <Slider {...slickSettings}>
                            {styleData.gallery && styleData.gallery.length > lookIndex
                            && styleData.gallery[lookIndex].images.map((image, iIndex) => {
                                return <div className="style-item" key={`style-gallery-${iIndex}`}>
                                    <div className="content">
                                        <img src={image} alt="style"/>
                                    </div>
                                </div>;
                            })}
                        </Slider>
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={bookThisStyle} color="primary" className="button-primary book-style">
                        Book This Style
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(StylesDialog);
