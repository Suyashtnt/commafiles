{ inputs, secrets, config, ... }: {
  imports = [
    inputs.sops-nix.nixosModules.sops
  ];
  sops = {
    defaultSopsFile = "${secrets}/secrets.json";
    age = {
      sshKeyPaths = [ "/etc/ssh/ssh_host_ed25519_key" ]; 
      keyFile = "/var/lib/sops-nix/key.txt";
    };
  };

  sops.secrets."copilot/key" = {
    owner = "tntman";
  };
}
