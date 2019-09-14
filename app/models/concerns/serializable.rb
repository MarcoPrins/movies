module Serializable
  extend ActiveSupport::Concern

  def serialize(methods: [])
    as_json(methods: methods)
      .deep_transform_keys { |key| key.camelize(:lower).gsub('?', '') }
  end
end
