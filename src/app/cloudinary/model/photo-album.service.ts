import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Photo} from './photo';
import {Cloudinary} from '@cloudinary/angular-5.x';

@Injectable()
export class PhotoAlbum {

    url:string = 'http://res.cloudinary.com/captiveConnections/image/list/v1540380124/myphotoalbum.json'
    //http://res.cloudinary.com/captiveConnections/image/list/v1540380124/myphotoalbum.json

    constructor(private http: HttpClient, private cloudinary: Cloudinary) {
    }

    getPhotos(): Observable<Photo[]> {
        // instead of maintaining the list of images, we rely on the 'myphotoalbum' tag
        // and simply retrieve a list of all images with that tag.
        let url = this.cloudinary.url('myphotoalbum', {
            format: 'json',
            type: 'list',
            // cache bust (lists are cached by the CDN for 1 minute)
            // *************************************************************************
            // Note that this is practice is DISCOURAGED in production code and is here
            // for demonstration purposes only
            // *************************************************************************
            version: Math.ceil(new Date().getTime() / 1000)
        });

        console.log('url',url);

        return this.http
            .get(this.url)
            .pipe(map((data: any) => {console.log('photo-service',data);return data.resources}));
    }
}
