package com.github.rafli_lutfi.superpos.api.dtos.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateCategoryRequestDTO {
    @JsonProperty("name")
    private String name;

    @JsonProperty("description")
    private String description;
}
