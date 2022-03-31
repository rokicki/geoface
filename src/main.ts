import { TwistyAlgViewer, TwistyPlayer } from "cubing/twisty";

class App {
  // Example of getting an element from the page.
  twistyPlayer: TwistyPlayer = document.querySelector("#main-player");
  shape: HTMLSelectElement = document.querySelector("#shape");
  cutdir: HTMLSelectElement = document.querySelector("#cutdir");
  geo: HTMLInputElement = document.querySelector("#geo");
  cut: HTMLInputElement = document.querySelector("#cut");
//  Example of creating a new element and adding it to the page.
  twistyAlgViewer = document.body.appendChild(
    new TwistyAlgViewer({ twistyPlayer: this.twistyPlayer })
  );
  constructor() {
    this.shape.addEventListener("change", () => { this.updateShapes(); });
    this.cutdir.addEventListener("change", () => { this.updateShapes(); });
    this.cut.addEventListener("change", () => { this.updateShapes(this.cut.value); });
    this.cut.addEventListener("input", () => { this.updateShapes(this.cut.value); });
    this.geo.addEventListener("input", () => { this.updateShapes(this.geo.value); });
    this.twistyPlayer.experimentalSetFlashLevel("none");
  }

  updateShapes(newval?: string): void {
    if (newval !== undefined) {
      this.cut.value = newval;
      this.geo.value = newval;
    } else {
      this.twistyPlayer.alg = "";
    }
    const geo = this.shape.value + " " + this.cutdir.value + " " + this.cut.value;
    this.updatePuzzle(geo);
  }

  updatePuzzle(geo: string): void {
    this.twistyPlayer.experimentalPuzzleDescription = geo;
  }
}

// Make the app object available in the console for debugging.
// Try running: app.updateScramble()
globalThis.app = new App();
