package com.github.rafli_lutfi.superpos.api.dtos.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequestDTO {
    @JsonProperty("username")
    @NotBlank
    private String username;

    @JsonProperty("email")
    @Email(regexp = "^[\\w\\.-]+@[a-zA-Z\\d\\.-]+\\.[a-zA-Z]{2,6}$", message = "email is not valid")
    @NotBlank
    private String email;

    @JsonProperty("password")
    @NotBlank
    private String password;

    @JsonProperty("confirm_password")
    @NotBlank
    private String confirmPassword;
}
