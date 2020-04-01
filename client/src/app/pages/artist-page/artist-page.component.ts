import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css'],
  providers: [ SpotifyService ]
})
export class ArtistPageComponent implements OnInit {
  artistId:string;
  artistName:string;
	artist:ArtistData;
	relatedArtists:ArtistData[];
	topTracks:TrackData[];
  albums:AlbumData[];
  imageURL:string;

  constructor(private route: ActivatedRoute, private spotifyService:SpotifyService) { }

  ngOnInit() {
    this.artistId = this.route.snapshot.paramMap.get('id');
    console.log("artist Id is: " + this.artistId)
    this.spotifyService.getArtist(this.artistId).then((response) => {
      console.log("response in artist-page is: ")
      console.log(response)
      this.artist = response
      this.artistName = response.name

      this.imageURL = response.imageURL
      console.log("artistName is:" + this.artistName)
      console.log("ImageURL is: " + this.imageURL)
    })

    this.spotifyService.getRelatedArtists(this.artistId).then((response) => {
      console.log("The response of related Artist in artist-page is:")
      console.log(response)
      this.relatedArtists = response
      console.log("relatedArtists in artist-page:")
      console.log(this.relatedArtists)
    })
    
    this.spotifyService.getTopTracksForArtist(this.artistId).then((response) => {
      console.log("response of getTopTracksForArtist in artist-page is: ")
      console.log(response) 
      this.topTracks = response
      console.log("TopTracks is: ")
      console.log(this.topTracks)
    })

    this.spotifyService.getAlbumsForArtist(this.artistId).then((response) => {
      console.log('response of getAlbumsForArtist in artist-page is: ')
      console.log(response)
      this.albums = response
    //TODO: Inject the spotifyService and use it to get the artist data, related artists, top tracks for the artist, and the artist's albums
    })
  }

}