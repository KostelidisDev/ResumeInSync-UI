import * as Bootbox from "bootbox.js/bootbox"
import Swal from "sweetalert2"

export const openModalForm = (formClass,
  passData,
  title,
  buttonTitle,
  buttonClasses,
  callback
) => {
  return Promise.resolve(new formClass({
    model: passData
  }))
    .then(form => Promise.resolve(form.render())
      .then(view => Bootbox.dialog({
        size: 'medium',
        title: title,
        message: view.el,
        backdrop: true,
        buttons: {
          ok: {
            label: buttonTitle,
            className: `btn ${buttonClasses}`,
            callback: callback.bind(form)
          }
        }
      })
      ))
}

const openModalDialogButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

export const openModalDialog = (title,
  text,
  icon,
  acceptButtonTitle,
  acceptButtonCallback,
  declineButtonTitle,
  declineButtonCallback
) => {
  return openModalDialogButtons.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: true,
    confirmButtonText: acceptButtonTitle,
    cancelButtonText: declineButtonTitle
  }).then((result) => {
    if (!(result.value)) {
      if (result.dismiss === Swal.DismissReason.cancel) {
        return declineButtonCallback()
      }
      return
    }

    return acceptButtonCallback()
  })
}
