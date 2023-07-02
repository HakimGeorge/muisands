import React, { Component } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';

class ImageGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [], // An array of 1000 images
            visibleImages: [], // Initially empty, to be populated with visible images
            hasMore: true, // Whether there are more images to load
        };
    }

    componentDidMount() {
        // Load the initial set of visible images
        this.loadMoreImages();
    }

    loadMoreImages = () => {
        const { images, visibleImages } = this.state;
        const nextBatch = images.slice(visibleImages.length, visibleImages.length + 20);

        if (nextBatch.length === 0) {
            // If there are no more images to load, update hasMore to false
            this.setState({ hasMore: false });
            return;
        }

        this.setState((prevState) => ({
            visibleImages: [...prevState.visibleImages, ...nextBatch],
        }));
    };

    render() {
        const { visibleImages, hasMore } = this.state;

        return (
            <InfiniteScroll
                dataLength={visibleImages.length}
                next={this.loadMoreImages}
                hasMore={hasMore}
                loader={<CircularProgress />}
                endMessage="No more images to load"
            >
                <Grid container spacing={2}>
                    {visibleImages.map((image, index) => (
                        <Grid item xs={6} sm={4} md={3} key={index}>
                            <img src={image.url} alt={image.alt} />
                        </Grid>
                    ))}
                </Grid>
            </InfiniteScroll>
        );
    }
}

export default ImageGallery;
