import React from 'react'

export default function FloatingButton() {
  return (
    <div class="position-fixed fixed-top fixed-end p-3" style={{marginTop: "2rem", paddingTop: "4.7rem !important", right: "0 !important", left: "93.7%"}}> <button type="button" class="btn btn-icon btn-lg btn-outline-secondary sidebar-btn" tabindex="0" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAddNode" > + </button> </div>
  )
}
