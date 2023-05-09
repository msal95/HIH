import React from "react";
import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";

export default function OffCanvas(props) {
  const { canvasOpen, canvasScroll, toggleCanvasScroll } = props;

  return (
    <Offcanvas
      scrollable={canvasScroll}
      //   backdrop={canvasBackdrop}
      direction="end"
      isOpen={canvasOpen}
      toggle={toggleCanvasScroll}
      className="mt-5"
    >
      <OffcanvasHeader toggle={toggleCanvasScroll}>
        OffCanvas {canvasScroll ? "Scroll" : "Backdrop"}
      </OffcanvasHeader>
      <OffcanvasBody className="my-auto mx-0 flex-grow-0">
        <p className="text-center">
          Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in
          laying out print, graphic or web designs. The passage is attributed to
          an unknown typesetter in the 15th century who is thought to have
          scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a
          type specimen book.
        </p>
        <p className="text-center">
          Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in
          laying out print, graphic or web designs. The passage is attributed to
          an unknown typesetter in the 15th century who is thought to have
          scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a
          type specimen book.
        </p>
        <p className="text-center">
          Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in
          laying out print, graphic or web designs. The passage is attributed to
          an unknown typesetter in the 15th century who is thought to have
          scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a
          type specimen book.
        </p>
        <p className="text-center">
          Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in
          laying out print, graphic or web designs. The passage is attributed to
          an unknown typesetter in the 15th century who is thought to have
          scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a
          type specimen book.
        </p>
        <Button
          block
          color="primary"
          onClick={toggleCanvasScroll}
          className="mb-1"
        >
          Continue
        </Button>
        <Button block outline color="secondary" onClick={toggleCanvasScroll}>
          Cancel
        </Button>
      </OffcanvasBody>
    </Offcanvas>
  );
}
