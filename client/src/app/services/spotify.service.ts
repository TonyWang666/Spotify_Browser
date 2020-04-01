import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    //Done
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server
    return this.http.get(this.expressBaseUrl+endpoint).toPromise();
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //TODO Done: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    return this.sendRequestToExpress('/search/'+category+'/'+encodeURIComponent(resource)).then((data) => {
      var result = [];
      //console.log(data);
      if(category == "artist"){
        for(var i = 0; i < data.artists.items.length; i++){
          result[i] = new ArtistData(data.artists.items[i]);
        }
      } else if(category == "track"){
        for(var i = 0; i < data.tracks.items.length; i++){
          result[i] = new TrackData(data.tracks.items[i]);
        }
      } else if(category == "album"){
        for(var i = 0; i < data.albums.items.length; i++){
          result[i] = new AlbumData(data.albums.items[i]);
        }
      }
      return result;
    });
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    return this.sendRequestToExpress('/artist/'+artistId).then((data) => {
      return new ArtistData(data);
    });
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    return this.sendRequestToExpress('/artist-related-artists/'+artistId).then((data) => {
      // console.log("artistData in getRelatedArtists of spotify is: " )
      // console.log(data)
      var res = []
      for(var i = 0; i < data.artists.length; i++){
        res[i] = new ArtistData(data.artists[i])
      }
      return res
    })
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
  }
  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    return this.sendRequestToExpress('/artist-top-tracks/'+artistId).then((data) => {
      return data.tracks;
    })
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    return this.sendRequestToExpress('/artist-albums/'+artistId).then((data)=> {
      console.log("data in getAlbumsForArtist of spotify is: ")
      console.log(data);
      var res = []
      for(var i = 0; i < data.items.length; i++){
        res[i] = new AlbumData(data.items[i])
      }
      return res
    })
  }
  
  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    return this.sendRequestToExpress('/album/'+albumId).then((data) => {
      return new AlbumData(data)
    })
  }
  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    return this.sendRequestToExpress('/album-tracks/'+albumId).then((data) => {
      console.log("data in getTracksForAlbum is: ")
      console.log(data)
      var res = []
      for(var i = 0; i < data.items.length; i++) {
        res[i] = new TrackData(data.items[i])
      }
      return res
    })
    //TODO: use the tracks for album endpoint to make a request to express.
    return null;
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    return this.sendRequestToExpress('/track/'+trackId).then((data) => {
      return new TrackData(data);
    });
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    return this.sendRequestToExpress('/track-audio-features/'+trackId).then((data) => {
      var result = [];
      for (let dataKey in data) {
        if(TrackFeature.FeatureTypes.includes(dataKey)){
          result.push(new TrackFeature(dataKey,data[dataKey]))
        }
      }
      return result;
    });
  }
}
