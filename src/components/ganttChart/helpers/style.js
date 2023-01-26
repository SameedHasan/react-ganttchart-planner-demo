export const styleCss = `
        * {
        margin: 0;
        padding: 0;
        /* scroll-behavior: smooth; */
        }

          body {
              overflow-y: hidden;
              /* Hide vertical scrollbar */
              overflow-x: hidden;
              /* Hide horizontal scrollbar */
          }

          .gutter {
          background-color: #eee;
          background-repeat: no-repeat;
          background-position: 50%;
          }

          .gutter.gutter-horizontal {
              background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==');
              cursor: col-resize;
          }

          .gutter.gutter-vertical {
              background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=');
              cursor: row-resize;
          }

          /* custom scrollbar */
/* width */
::-webkit-scrollbar {
    width: 5px;
    height: 5px;

}

/* Track */
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: darkgrey;
    border-radius: 16px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: grey;
}
        `;
