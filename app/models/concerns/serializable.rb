module Serializable
  extend ActiveSupport::Concern

  def serialize(methods: [], **procs)
    result = as_json(methods: methods)

    procs.each do |key, proc|
      result[key.to_s] = proc[self]
    end

    result.transform_values! do |value|
      value.respond_to?(:serialize) ? value.serialize : value
    end

    result.transform_keys! do |key|
      key.camelize(:lower).gsub('?', '')
    end

    result
  end
end
