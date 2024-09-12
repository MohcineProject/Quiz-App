import { Injectable } from '@angular/core';
import {Observable , Subject} from 'rxjs' ; 
import Swal from 'sweetalert2';



/**
 * A service for handling the fullscreen functionality
 * 
 * It provides a method to toggle the fullscreen on an HTML element 
 * and also a provides an observable to detect if the fullscreen is active
 * 
 */
@Injectable()
export class FullscreenService {


  private fullscreenElement : HTMLElement | null = null ; 
  private isFullScreen$  = new Subject<boolean>() ; 



/**
 * Initializes the FullscreenService by adding an event listener for the 'fullscreenchange' event.
 * 
 */
constructor() { 
  document.addEventListener('fullscreenchange', this.onFullscreenChange.bind(this)); 
}




/**
 * Removes the event listener for the 'fullscreenchange' event.
 * 
 */
ngOnDestroy(): void {
  document.removeEventListener('fullscreenchange', this.onFullscreenChange.bind(this)); 
}

/**
 * Handles the 'fullscreenchange' event by updating the fullscreen status observable.
 *
 */
private onFullscreenChange(){
    if (document.fullscreenElement){
      this.isFullScreen$.next(true) ;
    }
    else {
      this.fullscreenElement = null ;
      this.isFullScreen$.next(false) ;}
  
}



  /**
   * Returns an observable that indicates whether the fullscreen mode is active.
   *
   * @return {Observable<boolean>} an observable that emits true if the fullscreen mode is active, false otherwise
   */
  public isFullscreen() : Observable<boolean>{
    return this.isFullScreen$.asObservable() ; 
  }


  
  /**
   * Toggles the fullscreen mode on or off for the given HTML element.
   *
   * If the fullscreen mode is not currently active, this function will attempt to
   * activate it for the given element. If the fullscreen mode is already active,
   * this function will attempt to exit fullscreen mode.
   * 
   * The function will try to activate fullscreen mode using different methods depending on the browser.
   *
   * @param {HTMLElement} element - the HTML element to toggle fullscreen mode for
   */
  public async toggleFullscreen(element : HTMLElement ) {
    if(!this.fullscreenElement) { 
      if (element.requestFullscreen) {
        await element.requestFullscreen().
        then(() =>{
          this.fullscreenElement = element ; 
        }).catch(()=>{
          Swal.fire({
            title: 'Oops !',
            text : "There was an error going fullscreen",
            icon : 'error' , 
            confirmButtonText : 'Ok'
          })
        })
      }  else if ((element as any).webkitRequestFullscreen) {
        await (element as any).webkitRequestFullscreen().
        then(()=>{
        this.isFullScreen$.next(true) ;
        this.fullscreenElement = element ;
        })
        .catch(()=>{
          Swal.fire({
            title: 'Oops !',
            text : "There was an error going fullscreen",
            icon : 'error' , 
            confirmButtonText : 'Ok'
          })
        })
      }
    } else {
      await document.exitFullscreen()
      .catch(()=>{
        Swal.fire({
          title: 'Oops !',
          text : "There was an error releasing fullscreen",
          icon : 'error' , 
          confirmButtonText : 'Ok'
        })})

    }
  }
}



