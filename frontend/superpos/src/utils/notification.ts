import Swal from "sweetalert2";

export const notify = {
    success: (title: string = "Success", message?: string) => Swal.fire(title, message, "success"),
    error: (title: string = "Error", message?: string) => Swal.fire(title, message, "error"),
    confirm: (title: string = "Warning", message?: string) =>
        Swal.fire({
            title,
            text: message,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        }),
};
