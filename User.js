_module = "uber.resources";

function UserFactory($resource, apiAdress) {
  return $resource(apiAdress + 'user');
}
