// this does not get transpiled
import { LitElement, html } from "lit-element"

// this does get transpiled
class SomeTranspiledClass {

}

console.log(LitElement, html, SomeTranspiledClass)
