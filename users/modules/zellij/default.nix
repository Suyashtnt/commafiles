{ inputs, pkgs, ... }: {
	programs.zellij = {
		enable = true;
		settings = {
			ui = {
				pane_frames = {
					rounded_corners = true;
				};
			};
		};
	};

	home.shellAliases = {
		zr = "zellij run --";
		zrf = "zellij run --floating --";
		ze = "zellij edit";
		zef = "zellij edit --floating";
		# dev-env rust
		ders = "zellij action new-tab -l ~/.config/zellij/layouts/rust.kdl";
		# dev-env js
		dejs = "zellij action new-tab -l ~/.config/zellij/layouts/js.kdl";
	};

	xdg.configFile."zellij/layouts".source = ./layouts;
}
